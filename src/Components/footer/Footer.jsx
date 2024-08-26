import React, { useEffect, useState } from 'react';
import './footer.css';
import { Container, Grid, Typography,Box, SpeedDial, CardMedia } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link, NavLink } from 'react-router-dom';


export default function Footer() {
  const [showScroll, setShowScroll] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer">

      <div className="bg-footer">
        <Box className="overlay">
          <Container>

<div   className={`up ${showScroll ? 'show' : ''}`} 
        onClick={scrollToTop}></div>


            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className="text-uppercase fw-bold">
                <img className='color-g2' src="./uploads/end/text/qu/r.png" alt=""/>
                Contact Us
                </Typography>
                <Typography className="contact-item">
                <RoomIcon className='color-g'/>  Office 1306, Dusit Thani Al Muroor St Abu Dhabi, United Arab Emirates
                </Typography>
                <Typography className="contact-item">
                <Link to="tel:+971502135701" >

                <CallIcon className='color-g'/>  
                +971502135701
                </Link>

                </Typography>
                <Typography className="contact-item">
                  <Link to={"https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0"} target="_blank">
                  
                <WhatsAppIcon className='color-g'/>  
                +971502135701
                  
    
                  </Link>
                </Typography>
                <Typography className="contact-item">
                <Link to={"mailto:info@seattle-me.com"} >

                <MailIcon className='color-g'/>  
                info@seattle-me.com
                </Link>

                </Typography>
              </Grid>
              <Grid item xs={12} md={4} >
                <Typography variant="h6" className="text-uppercase fw-bold">
             <img className='color-g' src="./uploads/end/text/qu/r.png" alt=""/>
                Quick Links
                </Typography>
                <Typography><Link to="/Ourpartners" color="inherit" className="link">   <FiberManualRecordIcon className='color-g2'/> About Us</Link></Typography>
                <Typography><Link to="/Service" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/> Services</Link></Typography>
                <Typography><Link href="#!" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/> News</Link></Typography>
                <Typography><Link href="#!" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/> Videos</Link></Typography>
                <Typography><Link href="#!" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/> Careers</Link></Typography>
              </Grid>
            </Grid>

            <Grid container sx={{width:"105%"}} spacing={2} justifyContent="end" alignItems={"end"} className="social-media">
              <Grid item>
                <Link to="https://www.facebook.com/seattleme" color="inherit" target='_blank'>
                <img className="icon"  src="/uploads/end/icon social/facebook_1384005.png" alt=""/>
                </Link>
              </Grid>
              <Grid item>
                <Link to="https://www.instagram.com/seattlemiddleeast/" color="inherit" target='_blank'>
                <img className="icon"  src="/uploads/end/icon social/instagram_1384015.png" alt=""/>
                </Link>
              </Grid>
              <Grid item>
                <Link to="https://www.linkedin.com/company/seattleme/" target='_blank' color="inherit">
                <img className="icon"  src="/uploads/end/icon social/linkedin_1384014.png" alt=""/>
                </Link>
              </Grid>
              <Grid item>
                <Link to="https://www.snapchat.com/add/semabudhabi?invite_id=9MOLq1lA&locale=en_AE&share_id=warI0iHcROaLw-YwHLVqzw&sid=73c8101497ec451ebc15376ae6742048" color="inherit"target='_blank'>
                <img className="icon"  src="/uploads/end/icon social/snapchat_3669965.png"  alt=""/>
                </Link>
              </Grid>
              <Grid item>
                <Link to="https://www.threads.net/@seattlemiddleeast" color="inherit" target='_blank'>
                <img className="icon"  src="/uploads/end/icon social/threads.png" alt=""/>
 
                </Link>
              </Grid>
           
             
            </Grid>
            <div className="copyright">
              © 2024 All Rights Reserved - Seattle & Middle East Group
            </div>
          </Container>
          </Box>

      </div>
    </div>
  );
}
