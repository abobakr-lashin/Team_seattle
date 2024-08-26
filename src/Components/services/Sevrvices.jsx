import React from 'react';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './Sevrvices.css';

export default function Sevrvices() {
    const imgSevrvices = [
        { id: 1, src: './uploads/img/content/6.png' },
        { id: 2, src: './uploads/img/content/4.png' },
        { id: 3, src: './uploads/img/content/1.png' },
        { id: 4, src: './uploads/img/content/5.png' },
        { id: 5, src: './uploads/img/content/3.png' },
        { id: 6, src: './uploads/img/content/2.png' },
    ];

    const ser = imgSevrvices.map((img) => (

        <Link sx={{ margin: "auto" }} to={`/servieDetails/${img.id}`}>
            <img style={{margin: '20px 17px'}} className="img-Sevrvices" src={img.src} alt="" />
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
                </Box>
                <div className="h-5vh"></div>
            </div>
        </>
    );
}
