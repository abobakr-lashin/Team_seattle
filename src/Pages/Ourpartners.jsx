import React from 'react'
import NavPar from './../Components/appbar/NavPar'
import Footer from './../Components/footer/Footer.jsx'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box } from '@mui/material'
import "./OurPartners.css"
import { Link } from 'react-router-dom';
import FormN from '../Components/appbar/FormN.jsx';
import OUREXPERT from './OUREXPERT.jsx';
export default function OurPartners() {
    const imgBigOurPartners=[
        {id:1,src:"./uploads/img/esteemed/bag/images (1).png"},
        {id:2,src:"./uploads/img/esteemed/bag/images.png"},
        {id:3,src:"./uploads/img/esteemed/bag/emaar.png"},
    ]
    const imgSmallOurPartners=[
      { id: 1, src: "./uploads/img/esteemed/1.png" },
      { id: 2, src: "./uploads/img/esteemed/2.png" },
      { id: 3, src: "./uploads/img/esteemed/3.png" },
      { id: 4, src: "./uploads/img/esteemed/4.png" },
      { id: 5, src: "./uploads/img/esteemed/5.png" },
      { id: 6, src: "./uploads/img/esteemed/6.png" },
      { id: 7, src: "./uploads/img/esteemed/7.png" },
      { id: 8, src: "./uploads/img/esteemed/8.png" },
      { id: 10, src: "./uploads/img/esteemed/10.png" },
      { id: 11, src: "./uploads/img/esteemed/11.png" },
      { id: 12, src: "./uploads/img/esteemed/12.png" },
      { id: 13, src: "./uploads/img/esteemed/13.png" },
      { id: 14, src: "./uploads/img/esteemed/14.png" },
      { id: 15, src: "./uploads/img/esteemed/15.png" },
      { id: 16, src: "./uploads/img/esteemed/16.png" },
      { id: 17, src: "./uploads/img/esteemed/17.png" },
      { id: 18, src: "./uploads/img/esteemed/18.png" },
      { id: 19, src: "./uploads/img/esteemed/19.png" },
      { id: 20, src: "./uploads/img/esteemed/20.png" },
      { id: 21, src: "./uploads/img/esteemed/21.png" },
      { id: 22, src: "./uploads/img/esteemed/22.png" },
      { id: 23, src: "./uploads/img/esteemed/23.png" },
      { id: 24, src: "./uploads/img/esteemed/24.png" },
      { id: 25, src: "./uploads/img/esteemed/25.png" },
      { id: 26, src: "./uploads/img/esteemed/26.png" },
      { id: 27, src: "./uploads/img/esteemed/27.png" },
      { id: 28, src: "./uploads/img/esteemed/28.png" },
      { id: 29, src: "./uploads/img/esteemed/29.png" },
      { id: 30, src: "./uploads/img/esteemed/30.png" },
      { id: 31, src: "./uploads/img/esteemed/31.png" },
       ]


  return (
    <div className='one'>
    <div className='OurPartners'>
      <NavPar />

      <div className="h-5vh"></div>

<div className="grop-title">
  <div className="img-dis">
    <img src="/uploads/img/marpa.png" alt="" />
  </div>
  <div className="title-dis7">
    <h1>Home <Link to={"/"}><KeyboardDoubleArrowRightIcon sx={{color:"#d3b76d",fontSize:"65px"}}/> </Link> </h1>
    <div style={{textTransform:"uppercase"}}>Developers</div>
  </div>
</div>
<div className="h-5vh"></div>

<Box  sx={{width:"80%",margin:"20px auto"
}}>
<div className="img-Developers">

<h2 style={{textTransform:"uppercase"}}>Developers in uae</h2>

</div>
<div className="h-5vh"></div>
<div className='display12'>
{imgBigOurPartners.map((img)=>{
    return <div key={img.id}> <img className='imgBigOurPartners' src={img.src} alt="" /></div> 
})
}

</div>
<div className='display12'>
{imgSmallOurPartners.map((img)=>{
  return <div style={{margin:"25px"}} key={img.id}> <img className='imgSmallOurPartners' src={img.src} alt="" /></div> 
})

}
</div>


</Box>
<OUREXPERT/>
<div className="h-5vh"></div>

<Footer/>
   </div>
   </div>
  )
}
