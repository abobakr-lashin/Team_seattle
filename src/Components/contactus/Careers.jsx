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

export default function Careers() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "+971",
        email: "",
        experience: "",
    });
    const [phoneError, setPhoneError] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [serviceDetailsArr, setServiceDetailsArr] = useState([]);
    const [language, setLanguage] = useState(
        navigator.language.startsWith("ar") ? "ar" : "en"
    );
    const [fileURLs, setFileURLs] = useState([]);

    useEffect(() => {
        setLanguage(navigator.language.startsWith("ar") ? "ar" : "en");
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePhoneChange = (newValue) => {
        setFormData((prevData) => ({ ...prevData, phone: newValue }));

        const phoneLength = newValue.replace(/\D/g, "").length; // Remove non-numeric characters and get length
        if (phoneLength > 15 || phoneLength < 10) {
            setPhoneError(
                language === "ar"
                    ? "رقم الهاتف يجب أن يتراوح بين 10 و 15 رقماً"
                    : "Phone number must be between 10 and 15 digits"
            );
        } else {
            setPhoneError("");
        }
    };

    const handleButtonClick = async (event) => {
        event.preventDefault();

        const phoneLength = formData.phone.replace(/\D/g, "").length; // Remove non-numeric characters and get length

        // Validate name
        if (formData.name.trim() === "") {
            setNameError(
                language === "ar"
                    ? "الاسم لا يمكن أن يكون فارغاً"
                    : "Name cannot be empty"
            );
            return;
        } else {
            setNameError("");
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            setEmailError(
                language === "ar"
                    ? "البريد الإلكتروني غير صالح"
                    : "Invalid email address"
            );
            return;
        } else {
            setEmailError("");
        }

        // Validate phone number
        if (phoneLength > 15 || phoneLength < 10) {
            setPhoneError(
                language === "ar"
                    ? "رقم الهاتف يجب أن يتراوح بين 10 و 15 رقماً"
                    : "Phone number must be between 10 and 15 digits"
            );
            return;
        } else {
            setPhoneError("");
        }

        // If validation passes
        setSnackbarMessage(
            language === "ar"
                ? "تم تسجيل اهتمامك بنجاح!"
                : "Your interest has been registered successfully!"
        );
        setOpenSnackbar(true);

        // Add data to array
        const newEntry = { id: uuidv4(), ...formData };
        setServiceDetailsArr((prevArr) => {
            const updatedArr = [...prevArr, newEntry];
            console.log("Updated Array:", updatedArr); // Verify the array here
            return updatedArr;
        });

        // Clear form after submission
        setFormData({ name: "", phone: "+971", email: "", experience: "" });

        // Upload files
        if (fileURLs.length > 0) {
            try {
                const uploadedFileURLs = await Promise.all(fileURLs.map(async (file) => {
                    const fileRef = ref(storage, `files/${file.name}`);
                    await uploadBytes(fileRef, file);
                    return await getDownloadURL(fileRef);
                }));

                // Add Data Firestore
                await addDoc(collection(firestore, 'product'), {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    experience: formData.experience,
                    fileURLs: uploadedFileURLs , // Save all file URLs
                    date: new Date().toDateString(),
                    time: new Date().toLocaleTimeString()
                });

            } catch (error) {
                console.error("Error uploading files or adding document:", error);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

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
                    <div className='center10 mt-5'>
                        <div className="form10" placeholder="">
                            {/* Name */}
                            <input
                                name="name"
                                placeholder={
                                    language === "ar" ? "الاسم الكامل" : "Full Name"
                                }
                                value={formData.name}
                                onChange={handleChange}
                                className={nameError ? "error" : ""}
                                style={{
                                    marginBottom: "8px",
                                    boxSizing: "border-box",
                                }}
                            />
                            {nameError && (
                                <div
                                    style={{
                                        color: "red",
                                        top: "100%",
                                        left: "0",
                                        fontSize: "15px",
                                    }}
                                >
                                    {nameError}
                                </div>
                            )}
                            <div className="br"></div>
                            <div className="br"></div>
                            {/* Phone number */}
                            <MuiTelInput
                                sx={{
                                    mt: "10px",
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
                                error={Boolean(phoneError)}
                                helperText={phoneError}
                            />
                            <div className="br"></div>
                            <div className="br"></div>
                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                label={language === "ar" ? "البريد الإلكتروني" : "Email"}
                                variant="outlined"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(emailError)}
                                required
                            />
                            {emailError && (
                                <div
                                    style={{
                                        color: "red",
                                        top: "100%",
                                        left: "5px",
                                        margin: "2px",
                                        fontSize: "15px",
                                    }}
                                >
                                    {emailError}
                                </div>
                            )}
                            <div className="br"></div>
                            <div className="br"></div>
                            {/* Experience */}
                            <input
                                type='number'
                                name="experience"
                                placeholder={
                                    language === "ar" ? "عدد سنوات الخبرة" : "Years of Experience"
                                }
                                onChange={(e) => {
                                    setFormData({ ...formData, experience: e.target.value });
                                }}
                                value={formData.experience}
                                className={nameError ? "error" : ""}
                                style={{
                                    boxSizing: "border-box",
                                }}
                            />
                            {nameError && (
                                <div
                                    style={{
                                        color: "red",
                                        top: "100%",
                                        left: "0",
                                        fontSize: "15px",
                                    }}
                                >
                                    {nameError}
                                </div>
                            )}
                            <div className="br"></div>
                            <div className="br"></div>
                            {/* File upload */}
                            <h6>Upload CV / Resume(s)</h6>
                            <Button className='btn-files' variant="contained" component="label" style={{ backgroundColor: '#d4af37', color: '#0d223d', margin: '20px 0', textAlign: "center" }}>
                                <img className='img-file' src=" /uploads/CAREERS/Rectangle3.png" alt="" />
                                <input
                                    type="file"
                                    multiple
                                    hidden
                                    onChange={(e) => {
                                        setFileURLs(Array.from(e.target.files));
                                    }}
                                />
                            </Button>
                            {/* File upload */}
                            <button
                                className="serviceD2-submit"
                                onClick={handleButtonClick}
                            >
                                {language === "ar" ? "إرسال" : "Submit"}
                            </button>
                            <Snackbar
                                open={openSnackbar}
                                autoHideDuration={6000}
                                onClose={handleCloseSnackbar}
                            >
                                <Alert
                                    onClose={handleCloseSnackbar}
                                    severity="success"
                                    sx={{ width: "100%" }}
                                >
                                    {snackbarMessage}
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
                <div className="h-5vh"></div>
                <div className="h-5vh"></div>
                <Footer />
            </div>
        </div>
    );
}

