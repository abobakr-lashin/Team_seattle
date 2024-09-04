import React, { useEffect, useState } from 'react';
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { v4 as uuidv4 } from 'uuid';
import { Button, Snackbar, Alert } from '@mui/material';
import "./contact.css";
import { MuiTelInput } from 'mui-tel-input';
import Footer from '../footer/Footer';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app, { firestore, storage } from '../../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import OUREXPERT from '../../Pages/OUREXPERT';
import CareersForm from './CareersForm';

export default function Careers() {
 
    return (
        <div className='Careers'>
            <div className='OurPartners'>
                <div>
                    <NavPar />
                    <div className="h-5vh"></div>
                    <div className="grop-title">
                        <div className="img-dis">
                            <img src="/uploads/img/marpa.png" alt="" />
                        </div>
                        <div className="title-dis7">
                            <div>
                                Home
                                <Link to={"/"}>   <KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link>
                            </div>
                            <div>CAREERS</div>
                        </div>
                    </div>
                    <div className="h-5vh"></div>
                    <div className="center1">
                        <h2>JOIN OUR TEAM</h2>
                    </div >
                    <div className="hr1"></div>
                    <h3 className='center1'>
                        We are more than glad to review your skills and career experiences; feel free to upload your updated CV.
                    </h3>
              <CareersForm/>
                </div>
                <div className="h-5vh"></div>
                <OUREXPERT/>

                <div className="h-5vh"></div>
                <Footer />
            </div>
        </div>
    );
}

