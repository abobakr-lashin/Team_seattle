import React from 'react'
import NavPar from "../appbar/NavPar"
import Footer from '../footer/Footer';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FormMS from './FormMS';
import  './formMs.css';
export default function Mortgage() {
  const Mortgage = [
    { id: 1, src: "/uploads/Finish/Finish/Companies/SpartanTourism/1/INTEREST RATEANALYSIS.png" },
    { id: 2, src: "/uploads/Finish/Finish/Companies/SpartanTourism/1/LOAN PROCESSING&UNDERWRITING.png" },
    { id: 3, src: "/uploads/Finish/Finish/Companies/SpartanTourism/1/MORTGAGE REFINANCING.png" },
    { id: 4, src: "/uploads/Finish/Finish/Companies/SpartanTourism/1/MORTGAGECONSULTATION.png" },
    { id: 5, src: "/uploads/Finish/Finish/Companies/SpartanTourism/1/MORTGAGELOAN PRODUCTS.png" },
    { id: 6, src: "/uploads/Finish/Finish/Companies/SpartanTourism/1/MORTGAGEPRE-APPROVAL.png" },
    { id: 7, src: "/uploads/Finish/Finish/Companies/SpartanTourism/1/MORTGAGEPRE-APPROVALcopy.png" },
  ]
  const Mortgages = Mortgage.map((img) => {
    return (
      <Grid
        sx={{}}
        key={img.id}
        item
        xs={6}
        sm={3}
        md={3}
      >
    
          <img className="img-MORTGAGE overfull" src={img.src} alt="يسئبلسئ" />
      </Grid>
    );
  });

  return (
    <div>
      <div className='OurPartners'>
        <NavPar />

        <div className="h-5vh"></div>

        <div className="grop-title">
          <div className="img-dis">
            <img src="./uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis7">
            <div>Home 
            <Link to={"/"}>   <KeyboardDoubleArrowRightIcon  sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link> 
            </div>
            <div>SPARTAN TOURISM</div>
          </div>
        </div>
        <div className="h-5vh"></div>

        <div className="display3">
          <div className="img-jnj"><img src="/uploads/Finish/Finish/Companies/SpartanTourism/1/RequestQuoteNw.PNG" alt="" /></div>
          <div className="text-jnj">Spartan Tourism is a premier travel agency, where we redefine the art of travel. With a passion for exploration and a commitment to excellence, we are dedicated to curating extraordinary journeys that exceed your expectations. As a leader in the industry, we offer a wide range of services designed to cater to your every travel need. From meticulously planned itineraries to luxurious accommodations, seamless transportation, international visas and immersive experiences, we leave no stone unturned in ensuring that your travel experience is nothing short of exceptional. Trust us to deliver unparalleled service and unforgettable memories as we take you on a journey of a lifetime.



          </div></div>
        <div className="h-5vh"></div>


        <div className="grop-title">
          <div className="img-dis">
            <img src="./uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis7">
            <div>SPARTAN TOURISM SERVICES
            </div>
          </div>
        </div>
        <div className="h-5vh"></div>
        <Grid className='center overfull'sx={{ margin:"auto" ,width:"100%"}} container spacing={2}>
          {Mortgages}
        </Grid>
        <div className="h-5vh"></div>
        <FormMS />
        <div className="h-5vh"></div>
        <Footer />
      </div>
    </div>
  )
}
