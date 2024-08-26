import React from 'react';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import './Team.css';
export default function Team() {
  const imgTeam = [
    { id: 1, src: './uploads/img/team/essam.png'},
    { id: 2, src: './uploads/img/team/nada.png' },
    { id: 3, src: './uploads/img/team/saqr.png' },
  ];

  const imgTeams = imgTeam.map((img) => {
    return (
      <Link         key={img.id}
      to={`/TeamDetails/${img.id}`}>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        item
        xs={12}
        sm={6}
        md={4}
      >
 <img className="img-Team-Content" src={img.src} alt="" />
      </Grid>
    </Link>  
    );
  });

  return (
    <div className="Team">
      <Box sx={{color:"white",fontSize:"50px",textAlign:"center"}}>  </Box>
      <div className="img-Team">
      </div>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center',top: 5,width:"100%",margin:"auto"
          }}
          container
          spacing={0}
        >
     
          {imgTeams}
        </Box>
    </div>
  );
}
