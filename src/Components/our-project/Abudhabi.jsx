import React from 'react';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import NavPar from "../appbar/NavPar";
import Footer from '../footer/Footer';
import "./project.css";
import FormMS from '../morttgage/FormMS';

export default function Abudhabi() {
  const ourProject = [
    { id: 3, src: "/uploads/Finish/Finish/Projects/1/1.png" },
    { id: 1, src: "/uploads/Finish/Finish/Projects/1/2.png" },
    { id: 2, src: "/uploads/Finish/Finish/Projects/1/3.png" },
    { id: 4, src: "/uploads/Finish/Finish/Projects/1/4.png" },
    { id: 5, src: "/uploads/Finish/Finish/Projects/1/5.png" },
    { id: 6, src: "/uploads/Finish/Finish/Projects/1/6.png" },
    { id: 7, src: "/uploads/Finish/Finish/Projects/1/7.png" },
    { id: 8, src: "/uploads/Finish/Finish/Projects/1/8.png" },
    { id: 9, src: "/uploads/Finish/Finish/Projects/1/9.png" },
    { id: 10, src: "/uploads/Finish/Finish/Projects/1/10.png" },
    { id: 11, src: "/uploads/Finish/Finish/Projects/1/11.png" },
    { id: 12, src: "/uploads/Finish/Finish/Projects/1/12.png" },
    { id: 13, src: "/uploads/Finish/Finish/Projects/1/13.png" },
  ];

  const our = ourProject.map((img) => {
    return (
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,margin:"auto" ,width:"100%"}}
        key={img.id}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
        position={"relative"}
      >
        <Link className='center' to={`/AbudhabiDetails/${img.id}`}  >
          <img className="img-Sevrvices1" src={img.src} alt="Project Image" />
        </Link>
        <div className="resgister"><FormMS/>  </div>
      </Grid>
    );
  });

  return (
    <div className='OurProjects'>
      <NavPar />
      <div className="grop-title1 ">
        <div className="img-dis">
          <img src="./uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis6">
          <h2>Home 
          <Link to={"/"}>   <KeyboardDoubleArrowRightIcon  sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link> 
            
            </h2>
          <h3>Our Projects</h3>
        </div>
      </div>
      <div className="h-5vh"></div>

      <Grid className='center' container spacing={2}sx={{margin:"auto" ,width:"100%"}}>
        {our}
      </Grid>

      <div className="h-5vh"></div>
      <Footer />
    </div>
  );
}
