import NavPar from "./NavPar";
import "./Header.css";
import {
  Box,
  Snackbar,
  Alert,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PhoneIcon from "@mui/icons-material/Phone";
import FormContainer from "./FormContainer";
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import bannerFinish from "./BannerFinish.mp4";
import bannerFinish2 from "./elmadgot.mp4";

function Header() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [video, setVideo] = useState("");
  const videoRef = useRef(null);

  const actions = useMemo(
    () => [
      {
        icon: <WhatsAppIcon />,
        name: "WhatsApp",
        link: "https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0",
      },
      { icon: <PhoneIcon />, name: "Phone", link: "tel:+971502135701" },
    ],
    []
  );

  const handleActionClick = useCallback((link, name) => {
    if (name === "Phone") {
      window.location.href = link;
    } else {
      window.open(link, "_blank");
    }
    setSnackbarMessage(`لقد ضغطت على ${name}`);
    setOpenSnackbar(true);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setOpenSnackbar(false);
  }, []);

  useEffect(() => {
    if (window.screen.width > 431) {
      setVideo(bannerFinish);
      console.log("Video set for large screen");
    } else {
      setVideo(bannerFinish2);
      console.log("No video for small screen");
    }
  }, []);

  useEffect(() => {
    // تشغيل الفيديو تلقائيًا عند تحميل الصفحة إذا كانت قيمة الفيديو موجودة
    if (video && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("التشغيل التلقائي غير مسموح:", error);
      });
    }
  }, [video]); // إضافة video كشرط للتشغيل التلقائي

  return (
    <>
      <div className="header-container">
        {video && ( // عرض الفيديو فقط إذا كانت قيمته موجودة
          <video
            ref={videoRef}
            id="myVideo"
            className="video-background"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = videoRef.current.duration;
              }
            }}
          >
            <source src={video} type="video/mp4" />
            متصفحك لا يدعم عرض الفيديو.
          </video>
        )}

        <NavPar />

        <div className="Formheader">
          <FormContainer color={"rgba(255, 255, 255, 0.466)"} />
        </div>

        <Box className="chat">
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default React.memo(Header);
