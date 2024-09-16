import video from "./BannerFinish.mp4";
import video2 from "./video2.mp4";
import NavPar from "./NavPar";
import "./Header.css";
import { Box, Snackbar, Alert, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import FormContainer from "./FormContainer";
import React, { useEffect, useState } from 'react';

// Post Data To fireBase (Ensure you have the logic for posting data)

export default function Header() {
    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const actions = [
        { icon: <WhatsAppIcon />, name: 'WhatsApp', link: "https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0" },
        { icon: <PhoneIcon />, name: 'Phone', link: "tel:+971502135701" },
    ];
        const [videoSrc, setVideoSrc] = useState("");
      
        useEffect(() => {
          const handleResize = () => {
            // إذا كان عرض الشاشة أكبر من 1024px، قم بتعيين فيديو للشاشات الكبيرة
            if (window.innerWidth > 1024) {
              setVideoSrc(video);
            } else {
              // إذا كان عرض الشاشة أقل من 1024px، قم بتعيين فيديو للشاشات الصغيرة
              setVideoSrc(video2);
            }
          }; handleResize();

          // أضف مستمع للحدث للتعامل مع تغيير حجم الشاشة
          window.addEventListener('resize', handleResize);
      
          // قم بإزالة المستمع عند إلغاء تحميل المكون
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);
    const handleActionClick = (link, name) => {
        if (name === 'Phone') {
            window.location.href = link; // Initiates the phone call
        } else {
            window.open(link, '_blank');
        }
        setSnackbarMessage(`You clicked on ${name}`);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <div className="header-container">
            <video className="video-background" autoPlay loop muted>
      <source src={videoSrc} type="video/mp4" />
    </video>
                <NavPar />

<div className="Formheader">
<FormContainer color={"rgba(255, 255, 255, 0.466)"}/>
    </div>
             


                <Box className="chat">
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                        icon={<SpeedDialIcon />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={() => handleActionClick(action.link, action.name)}
                            />
                        ))}
                    </SpeedDial>
                </Box>
            </div>

            {/* Snackbar for notifications */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
