import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography,Box} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link } from 'react-router-dom';

import './footer.css';
import './footerphon.css';

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

  const scrollTooTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer">

      <div className="bg-footer">
        <Box className="overlay">
          <Container>

<div   className={`up ${showScroll ? 'show' : ''}`} 
        onClick={scrollTooTop}></div>


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
                <div className='dis-appbar'>
<div>


                <div><Link to="/BUY" color="inherit" className="link">   <FiberManualRecordIcon className='color-g2'/> BUY</Link></div>
                <div><Link to="/RENT" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/>RENT</Link></div>
                <div><Link to="/Commercial" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/>COMMERCIAL</Link></div>
                <div><Link to="/Ourpartners" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/>DEVELOPERS</Link></div>
                <div><Link to="/Abudhabi" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/> AREAS</Link></div>
                </div>
<div>


                <div><Link to="/SELL" color="inherit" className="link">   <FiberManualRecordIcon className='color-g2'/>SELL</Link></div>
                <div><Link to="/Contactus" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/>APPLY</Link></div>
                <div><Link to="/About" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/> ABOUT US</Link></div>
                <div><Link to="/LatestNews" color="inherit" className="link"> <FiberManualRecordIcon className='color-g2'/> BLOGS</Link></div>
                </div>
</div>
              </Grid>
            </Grid>

            <Grid container sx={{width:"105%"}} spacing={2} justifyContent="end" alignItems={"end"} className="social-media">
              <Grid item>
                <Link to="https://www.facebook.com/seattleme" color="inherit" target='_blank'>
                <img className="icon"  src="/uploads/end/icon social/facebook_1384005.png" alt=""/>
                </Link>
              </Grid>
              <Grid item>
                <Link to="https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA" color="inherit" target='_blank'>
                <img className="icon"  src="/uploads/end/icon social/instagram_1384015.png" alt=""/>
                </Link>
              </Grid>
              <Grid item>
                <Link to="https://www.linkedin.com/company/seattleme/" target='_blank' color="inherit">
                <img className="icon"  src="/uploads/end/icon social/linkedin_1384014.png" alt=""/>
                </Link>
              </Grid>
              <Grid item>
                <Link to="https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65" color="inherit"target='_blank'>
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
