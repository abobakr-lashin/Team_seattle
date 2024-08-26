import React from 'react'
import Team from "./../meettheTeam/Team.jsx"
import Footer from "./../footer/Footer.jsx"
import NavPar from "./../appbar/NavPar"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from 'react-router-dom';
export default function TeamS() {
  return (
       <div className='OurPartners'>
    <NavPar />

    <div className="h-5vh"></div>

<div className="grop-title">
<div className="img-dis">
  <img src="./uploads/img/marpa.png" alt="" />
</div>
<div className="title-dis6">
  <h2>Home 
  <Link to={"/"}><KeyboardDoubleArrowRightIcon sx={{color:"#d3b76d",fontSize:"65px"}}/> </Link> 
  </h2>
  <h3>MEET THE TEAM</h3>
</div>
</div>
<div className="h-5vh"></div>
<Team/>
<div className="h-10vh"></div>
<Footer/>
</div>

  )
}


