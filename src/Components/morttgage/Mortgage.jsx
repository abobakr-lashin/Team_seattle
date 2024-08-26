import React from 'react'
import NavPar from "../appbar/NavPar"
import Footer from '../footer/Footer';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FormMS from './FormMS';
import  './formMs.css';

export default function Mortgage() {
  const Mortgage = [
    { id: 1, src: "/uploads/Finish/Finish/Companies/jnj-mortgage/1/MORTGAGECONSULTATION.png" },
    { id: 2, src: "/uploads/Finish/Finish/Companies/jnj-mortgage/1/MORTGAGEPRE-APPROVAL.png" },
    { id: 3, src: "/uploads/Finish/Finish/Companies/jnj-mortgage/1/MORTGAGEPRE-APPROVALcopy.png" },
    { id: 4, src: "/uploads/Finish/Finish/Companies/jnj-mortgage/1/MORTGAGELOANPRODUCTS.png" },
    { id: 5, src: "/uploads/Finish/Finish/Companies/jnj-mortgage/1/INTERESRATEANALYSIS.png" },
    { id: 6, src: "/uploads/Finish/Finish/Companies/jnj-mortgage/1/LOANPROCESSING&UNDERWRITING.png" },
    { id: 7, src: "/uploads/Finish/Finish/Companies/jnj-mortgage/1/MORTGAGEREFINANCING.png" },
  ]
  const Mortgages = Mortgage.map((img) => {
    return (
      <Grid
        sx={{}}
        key={img.id}
        item
        xs={12}
        sm={3}
        md={3}
      >
          <img className="img-MORTGAGE1 overfull" src={img.src} alt="يسئبلسئ" />
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
            <div>JNJ-MORTGAGE</div>
          </div>
        </div>
        <div className="h-5vh"></div>

        <div className="display3">
          <div className="img-jnj"><img src="/uploads/Finish/Finish/Companies/jnj-mortgage/1/JNJ.png" alt="" /></div>
          <div className="text-jnj">JNJ Mortgage is a leading mortgage services provider operating in the United Arab Emirates. With a strong presence in the UAE market, JNJ offers a comprehensive range of mortgage services tailored to meet the unique needs of individuals, families and cooperations seeking to secure their dream real estate. Committed to upholding the highest standards of professionalism and customer satisfaction, JNJ stands as a trusted partner in the pursuit of real estate ownership in the UAE. With a team of experienced professionals and a deep understanding of the local real estate landscape, JNJ Mortgage is dedicated to providing exceptional financial solutions and guidance to clients, ensuring their aspirations are realized with utmost precision and efficiency.

          </div></div>
        <div className="h-5vh"></div>


        <div className="grop-title">
          <div className="img-dis">
            <img src="./uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis7">
            <div>JNJ MORTGAGE SERVICES</div>
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
