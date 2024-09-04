import React, { useState, useEffect } from "react";
import video from "./BannerFinish.mp4";
import NavPar from "./NavPar";
import "./Header.css";
import { TextField, Snackbar, Alert, Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { v4 as uuidv4 } from 'uuid'; // For generating unique ids
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import app from "../../firebaseConfig";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
export default function FormContainer({color,jast}) {

    const [formData, setFormData] = useState({ name: "", phone: "+971" });
    const [phoneError, setPhoneError] = useState("");
    const [nameError, setNameError] = useState("");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [arr, setArr] = useState([]);
    const [language, setLanguage] = useState(navigator.language.startsWith('ar') ? 'ar' : 'en');

    // Post Data To fireBase
    const db = getDatabase(app)
    const newDocRef = push(ref(db, 'nature/fruits'))


    useEffect(() => {
        // Determine the language based on the browser settings
        setLanguage(navigator.language.startsWith('ar') ? 'ar' : 'en');
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handlePhoneChange = (newValue) => {
        setFormData(prevData => ({ ...prevData, phone: newValue }));

        const phoneLength = newValue.replace(/\D/g, '').length; // Remove non-numeric characters and get length
        if (phoneLength > 15 || phoneLength < 10) {
            setPhoneError(language === 'ar' ? "رقم الهاتف يجب أن يتراوح بين 10 و 15 رقماً" : "Phone number must be between 10 and 15 digits");
        } else {
            setPhoneError("");
        }
    };

    const handleButtonClick = () => {
        const phoneLength = formData.phone.replace(/\D/g, '').length; // Remove non-numeric characters and get length

        // Validate name
        if (formData.name.trim() === "") {
            setNameError(language === 'ar' ? "الاسم لا يمكن أن يكون فارغاً" : "Name cannot be empty");
            return;
        } else {
            setNameError("");
        }

        // Validate phone number
        if (phoneLength > 15 || phoneLength < 10) {
            setPhoneError(language === 'ar' ? "رقم الهاتف يجب أن يتراوح بين 10 و 15 رقماً" : "Phone number must be between 10 and 15 digits");
            return;
        } else {
            setPhoneError("");
        }

        // Add Data Post Firebase 
        set(newDocRef, {
            name: formData.name,
            phone: formData.phone,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString()
        }).then(() => {
            console.log('success')
            toast.success('Success message')
            // delete Data Fore Send Data
            setFormData({ name: "", phone: "+971" })
        }).catch((error) => {
            console.log('error')
        })
    };
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <div>
         <div className="form-container" >
                    <Box className="form" sx={{backgroundColor:`${color}`}}>
                        <TextField
                            className="input"
                            sx={{
                                width: "100%",
                                maxWidth: "350px",
                                mt: "20px",
                                backgroundColor: "white",
                                borderRadius: "21px",
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                    '&:hover fieldset': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none',
                                    },
                                },

                            }}
                            id="name-field"
                            name="name"
                            placeholder={language === 'ar' ? "الاسم" : "Name"}
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {nameError && (
                            <p style={{ color: "red", fontSize: "14px" }}>{nameError}</p>
                        )}
                        <MuiTelInput
                            className="input"
                            sx={{
                                width: "100%",
                                maxWidth: "350px",
                                mt: "10px",
                                backgroundColor: "white",
                                borderRadius: "21px",
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border: 'none',
                                    },
                                    '&:hover fieldset': {
                                        border: 'none',
                                    },
                                    '&.Mui-focused fieldset': {
                                        border: 'none',
                                    },
                                },

                            }}
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            inputProps={{ placeholder: language === 'ar' ? "رقم الهاتف" : "Phone Number" }}
                        />
                        {phoneError && (
                            <p style={{ color: "red", fontSize: "14px" }}>{phoneError}</p>
                        )}
                        <button className="btn-register" onClick={handleButtonClick}>
                            {language === 'ar' ? "سجل اهتمامك" : "Register your interest"}
                        </button>
                        <div className="contact-icons">
                            <a href="tel:+971502135701" className="contact-icon-link">
                                <img src="./uploads/img/mobile.png" alt="mobile" />
                            </a>
                            <a href="https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0" target="_blank" className="contact-icon-link">
                                <img src="./uploads/img/whatsapp.png" alt="whatsapp" />
                            </a>
                        </div>
                    </Box>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </div>
    </div>
  )
}
