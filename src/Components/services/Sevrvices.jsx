import React from 'react';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './Sevrvices.css';

import img1 from '../../Uploads/content/Sevrvice1.png'
import img2 from '../../Uploads/content/Sevrvice3.png'
import img3 from '../../Uploads/content/Sevrvice4.png'
import img4 from '../../Uploads/content/Sevrvice5.png'
import img5 from '../../Uploads/content/Sevrvice6.png'
import img6 from '../../Uploads/content/Sevrvice2.png'



export default function Sevrvices() {
    const imgSevrvices = [
        { id: 1, src: img1 },
        { id: 2, src: img2 },
        { id: 3, src: img3 },
        { id: 4, src: img4 },
        { id: 5, src: img5 },
        { id: 6, src: img6 },
    ];

    const ser = imgSevrvices.map((img) => (

        <Link sx={{ margin: "auto" }} to={`/servieDetails/${img.id}`}>
            <img style={{ margin: '20px 17px' }} className="img-Sevrvices" src={img.src} alt="" />
        </Link>
    ));

    return (
        <>
            <div className="Sevrvices">
                <div className="h-5vh"></div>
                <div className="grop-title4">
                    <div className="img-dis3">
                        <img src="/uploads/img/marpa.png" alt="مريع" />
                    </div>
                    <div className="title-dis2">
                        <h2>Our SERVICES</h2>
                        <h3>SEATTLE & MIDDLE EAST GROUP OFFERS A VARIETY OF SERVICES IN THE REAL ESTATE INDUSTRY</h3>
                    </div>
                </div>
                <div className="h-5vh"></div>
                <Box sx={{
                    display: 'flex', justifyContent: "center", alignItems: 'center', margin: "auto", flexWrap: "wrap", flexDirection: "row"
                }}
                    container margin={"auto"} >
                    {ser}
                    <Link to={"/Mortgage"}> <img className="img-Sevrvices" src="./uploads/img/content/mortgage.png" alt="" /></Link>
                </Box>
                <div className="h-5vh"></div>
            </div>
        </>
    );
}
