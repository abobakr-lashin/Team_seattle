import { Grid } from '@mui/material';
import React from 'react'
import './INSIGHTS.css'
import { Link } from 'react-router-dom';
import LastNews from '../blog/LastNews';
export default function INSIGHTS() {

 

  return (
   <>
   
   <div className='INSIGHTS'> 
<div className="h-5vh"></div>
        <div className="grop-title1">
          <div className="img-dis1">
            <img src="./uploads/img/marpa.png" alt="مريع" />
      </div>
      <div className="title-dis2">
      <h2>INSIGHTS AND UPDATES</h2>
      <h3>STAY INFORMED WITH THE LATEST NEWS, UPDATES, AND EXPERT REAL ESTATE ADVICE FROM SEATTLE & MIDDLE EAST GROUP </h3>
            </div>
      </div>
            <LastNews  newsPerPage={3}/>
      </div>
      <div className="h-5vh"></div>

   </>
  )
}
