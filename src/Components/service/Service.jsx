import React from 'react'
import NavPar from "../appbar/NavPar"
import { Box, Grid } from '@mui/material';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import OUREXPERT from '../../Pages/OUREXPERT';

export default function Service() {
    const imgSevrvices = [
        { id: 1, src: './uploads/img/content/Sevrvice1.png' },
        { id: 2, src: './uploads/img/content/Sevrvice3.png' },
        { id: 3, src: './uploads/img/content/Sevrvice4.png' },
        { id: 4, src: './uploads/img/content/Sevrvice5.png' },
        { id: 5, src: './uploads/img/content/Sevrvice6.png' },
        { id: 6, src: './uploads/img/content/Sevrvice2.png' },
    ];

    const ser = imgSevrvices.map((img) => (
        <Link sx={{ margin: "auto" }} to={`/servieDetails/${img.id}`}>

            <img style={{ margin: '20px 17px', }} className="img-Sevrvices" src={img.src} alt="" />
        </Link>
    ));
    return (
        <>
            <div>
                <div className="OurPartners">
                    <NavPar />
                    <div className="h-5vh"></div>
                    <div className="grop-title">
                        <div className="img-dis">
                            <img src="/uploads/img/marpa.png" alt="" />
                        </div>
                        <div className="title-dis7" style={{ display: "flex" }}>
                            <h2>
                                Home{" "}
                                <Link to={"/"}>  
                             <KeyboardDoubleArrowRightIcon  sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link> 

                                <div>MANAGEMENT TEAM</div>
                            </h2>
                        </div>
                    </div>
                    <br />
                    <Box sx={{
                        display: 'flex', justifyContent: "center", alignItems: 'center', margin: "auto", flexWrap: "wrap", flexDirection: "row"
                    }}
                        container margin={"auto"} >
                        {ser}
                        <Link to={"/Mortgage"}> <img className="img-Sevrvices"  src="./uploads/img/content/mortgage.png" alt="" /></Link> 

                    </Box>
                    <div className="h-5vh"></div>
                    <OUREXPERT/>
                    <Footer />
                </div>
            </div>
        </>
    )
}
