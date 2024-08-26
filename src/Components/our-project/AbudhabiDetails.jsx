import React from 'react'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import NavPar from "../appbar/NavPar"
import Footer from '../footer/Footer';
import "./project.css"
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import FormMS from '../morttgage/FormMS';





export default function AbudhabiDetails() {

    const AbudhabiDetails =[
      {id:1,src:"/uploads/Finish/Finish/Projects/1/0.png" },
      {id:2,src:"/uploads/Finish/Finish/Projects/1/0.png" },
        {id:3,src:"/uploads/Finish/Finish/Projects/1/0.png" },
         {id:4,src:"/uploads/Finish/Finish/Projects/1/0.png" },
         {id:5,src:"/uploads/Finish/Finish/Projects/1/0.png" },
         {id:6,src:"/uploads/Finish/Finish/Projects/1/0.png" },
         {id:7,src:"/uploads/Finish/Finish/Projects/1/0.png" },
         {id:8,src:"/uploads/Finish/Finish/Projects/1/0.png" },
         {id:9,src:"/uploads/Finish/Finish/Projects/1/0.png" },
       {id:10,src:"/uploads/Finish/Finish/Projects/1/0.png" },
       {id:11,src:"/uploads/Finish/Finish/Projects/1/0.png" },
       {id:12,src:"/uploads/Finish/Finish/Projects/1/0.png" },
       {id:13,src:"/uploads/Finish/Finish/Projects/1/0.png" },
      ]
      const Abudhabi = AbudhabiDetails.map((img) => {
        return (
          <Grid
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            key={img.id}
            item
            xs={12}
            sm={4}
            md={3}
          >
          <Link className='center' to={`/AbudhabiDetails/${img.id}`}  >
          <img className="img-Sevrvices" src={img.src} alt="يسئبلسئ" />
            </Link>
          </Grid>
        );
      });
  return (
    <div className='OurProjects'>
         <NavPar />
         <div className="h-5vh"></div>

         <div className="grop-title1 ">
<div className="img-dis">
  <img src="/uploads/img/marpa.png" alt="" />
</div>
<div className="title-dis7">
  <h2>Home 
  <Link to={"/"}><KeyboardDoubleArrowRightIcon sx={{color:"#d3b76d",fontSize:"65px"}}/> </Link> 
    
    
    Our Projects
    
    <Link to={"/Abudhabi"}><KeyboardDoubleArrowRightIcon sx={{color:"#d3b76d",fontSize:"65px"}}/> </Link> 
  
  </h2>
  <h3>PROJECTS</h3>
</div>
</div>
<div className="h-5vh"></div>

<Grid className='center' container spacing={2}>
          {Abudhabi}
        </Grid>

        <div className="h-5vh"></div>
        <Footer/>

    </div>
  )
}
