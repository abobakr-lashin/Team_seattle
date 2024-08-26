/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import "./contact.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import NavPar from "../appbar/NavPar";
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MuiTelInput } from 'mui-tel-input';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../footer/Footer';
import app from '../../firebaseConfig';
import { getDatabase, push, ref, set } from 'firebase/database';

export default function Contactus() {

    const [contactFormData, setContactFormData] = useState({
        id: uuidv4(),
        fullName: "",
        contactPhone: "+971",
        contactEmail: "",
        contactMessage: "",
    });
    const [contactPhoneError, setContactPhoneError] = useState("");
    const [contactNameError, setContactNameError] = useState("");
    const [contactEmailError, setContactEmailError] = useState("");
    const [contactOpenSnackbar, setContactOpenSnackbar] = useState(false);
    const [contactSnackbarMessage, setContactSnackbarMessage] = useState("");
    const [submittedFormMessages, setSubmittedFormMessages] = useState([]);
    const [contactLanguage, setContactLanguage] = useState(
        navigator.language.startsWith("ar") ? "ar" : "en"
    );

    const db = getDatabase(app);
    const newDatabase = push(ref(db, 'user/message'))

    useEffect(() => {
        setContactLanguage(navigator.language.startsWith("ar") ? "ar" : "en");
    }, []);

    const handleContactChange = (event) => {
        const { name, value } = event.target;
        setContactFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleContactPhoneChange = (newValue) => {
        setContactFormData((prevData) => ({ ...prevData, contactPhone: newValue }));

        const phoneLength = newValue.replace(/\D/g, "").length; // Remove non-numeric characters and get length
        if (phoneLength > 15 || phoneLength < 10) {
            setContactPhoneError(
                contactLanguage === "ar"
                    ? "رقم الهاتف يجب أن يتراوح بين 10 و 15 رقماً"
                    : "Phone number must be between 10 and 15 digits"
            );
        } else {
            setContactPhoneError("");
        }
    };

    const handleContactButtonClick = (event) => {
        event.preventDefault();

        const phoneLength = contactFormData.contactPhone.replace(/\D/g, "").length; // Remove non-numeric characters and get length

        // Validate name
        if (contactFormData.fullName.trim() === "") {
            setContactNameError(
                contactLanguage === "ar"
                    ? "الاسم لا يمكن أن يكون فارغاً"
                    : "Name cannot be empty"
            );
            return;
        } else {
            setContactNameError("");
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(contactFormData.contactEmail)) {
            setContactEmailError(
                contactLanguage === "ar"
                    ? "البريد الإلكتروني غير صالح"
                    : "Invalid email address"
            );
            return;
        } else {
            setContactEmailError("");
        }

        // Validate phone number
        if (phoneLength > 15 || phoneLength < 10) {
            setContactPhoneError(
                contactLanguage === "ar"
                    ? "رقم الهاتف يجب أن يتراوح بين 10 و 15 رقماً"
                    : "Phone number must be between 10 and 15 digits"
            );
            return;
        } else {
            setContactPhoneError("");
        }

        setContactSnackbarMessage(
            contactLanguage === "ar"
                ? "تم تسجيل اهتمامك بنجاح!"
                : "Your interest has been registered successfully!"
        );
        setContactOpenSnackbar(true);

        // Add data to array
        const newEntry = { id: uuidv4(), ...contactFormData };
        setSubmittedFormMessages((prevArr) => {
            const updatedArr = [...prevArr, newEntry];
            console.log("Updated Array:", updatedArr); // Verify the array here
            return updatedArr;
        });

        // Perform any action with formData, e.g., sending to a server
        console.log("Saved Data:", submittedFormMessages);

        // Clear form after submission
        setContactFormData({ id: uuidv4(), fullName: "", contactPhone: "+971", contactEmail: "", contactMessage: "" });

        // set(newDatabase , {
        //     id: uuidv4(),
        //     fullName: contactFormData.fullName,
        //     contactPhone: contactFormData.contactPhone,
        //     contactEmail: contactFormData.contactEmail,
        //     contactMessage: contactFormData.contactMessage,
        //     date: new Date().toDateString(),
        //     time: new Date().toLocaleTimeString()
        // }).then(()=>{
        //     console.log("Data has been saved to Firebase!");
        // }).catch(err => {
        //     console.error("Error saving data to Firebase: ", err);
        // })
        set(ref(db, `user/message/${contactFormData.id}`), {
            id: contactFormData.id,
            fullName: contactFormData.fullName,
            contactPhone: contactFormData.contactPhone,
            contactEmail: contactFormData.contactEmail,
            contactMessage: contactFormData.contactMessage,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString()
        }).then(() => {
            console.log("Data has been saved to Firebase!");
        }).catch(err => {
            console.error("Error saving data to Firebase: ", err);
        })


    };

    return (
        <div>
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
                            <div>CONTACT US</div>
                        </div>
                    </div>
                    <div className="h-5vh"></div>
                    <div className="center">
                        <h2>GET IN TOUCH WITH US </h2>
                    </div>
                    <div className="hr1"></div>
                    <div className="display2">
                        <div className="address">
                            <div className="name">
                                Address
                            </div>
                            <img src="/uploads/Contactus/locahen.png" alt="erfw" />
                            <div className="pragraf">Office 1306, Dusit Thani Al Muroor St
                                Abu Dhabi, United Arab Emirates</div>
                        </div>
                        <div className="hr2"></div>
                        <Link to="tel:+971502135701">
                            <div className="address">
                                <div className="name">
                                    Phone
                                </div>
                                <img src="/uploads/Contactus/phone.png" alt="erfw" />
                                <div className="pragraf">
                                    +971502135701
                                </div>
                            </div>
                        </Link>
                        <div className="hr2"></div>
                        <Link to={"mailto:info@seattle-me.com"} >
                            <div className="address">
                                <div className="name">
                                    Email
                                </div>
                                <img src="/uploads/Contactus/email.png" alt="erfw" />
                                <div className="pragraf">
                                    info@seattle-me.com
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="h-5vh"></div>

                    <div className="display2 m-5">
                        <Link to={"https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0"} target='_blank'> <img width={"220px"} src="/uploads/Contactus/whatsApp.png" alt="" /></Link>
                    </div>
                    <div className="h-5vh"></div>

                    <div className="display5">
                        <div className="form5">
                            <form>
                                <div className="center">
                                    <h2>SEND US A MESSAGE </h2>
                                </div>
                                <div className="hr1"></div>
                                {/* name */}
                                <input
                                    name="fullName"
                                    placeholder={contactLanguage === "ar" ? "الاسم الكامل" : "Full Name"}
                                    value={contactFormData.fullName}
                                    onChange={handleContactChange}
                                    className={contactNameError ? "error" : ""}
                                    style={{
                                        padding: "8px",
                                        marginBottom: "8px",
                                        boxSizing: "border-box",
                                    }}
                                />
                                {contactNameError && (
                                    <div
                                        style={{
                                            color: "red",
                                            top: "100%",
                                            left: "0",
                                            fontSize: "15px",
                                        }}
                                    >
                                        {contactNameError}
                                    </div>
                                )}
                                {/* name */}
                                <div className="br"></div>
                                {/* email */}
                                <input
                                    type="email"
                                    placeholder={contactLanguage === "ar" ? "البريد الإلكتروني" : "Email"}
                                    name="contactEmail"
                                    value={contactFormData.contactEmail}
                                    onChange={handleContactChange}
                                    style={{
                                        padding: "8px",
                                        marginBottom: "8px",
                                        boxSizing: "border-box",
                                    }}
                                    className={contactEmailError ? "error" : ""}
                                />
                                {contactEmailError && (
                                    <div
                                        style={{
                                            color: "red",
                                            top: "100%",
                                            left: "5px",
                                            margin: "2px",
                                            fontSize: "15px",
                                        }}
                                    >
                                        {contactEmailError}
                                    </div>
                                )}
                                {/* email */}
                                {/* phone */}
                                <MuiTelInput
                                    sx={{
                                        mt: "10px",
                                        backgroundColor: "white",
                                        borderRadius: "21px",
                                        border: "none",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
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
                                    value={contactFormData.contactPhone}
                                    onChange={handleContactPhoneChange}
                                    error={Boolean(contactPhoneError)}
                                    helperText={contactPhoneError}
                                />
                                {/* phone */}
                                {/* Textarea */}
                                <textarea
                                    placeholder={contactLanguage === "ar" ? "الرسالة" : "Message"}
                                    name="contactMessage"
                                    label={contactLanguage === "ar" ? "الرسالة" : "Message"}
                                    variant="outlined"
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={contactFormData.contactMessage}
                                    onChange={handleContactChange}
                                    required
                                    style={{
                                        padding: "8px",
                                        marginBottom: "8px",
                                        boxSizing: "border-box",
                                    }}
                                />
                                {/* Textarea */}
                                {/* button */}
                                <Button
                                    sx={{
                                        textAlign: "center",
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        margin: "auto"
                                    }}
                                    className='submit'
                                    onClick={handleContactButtonClick}
                                    variant="contained"
                                    color="primary"
                                >
                                    {contactLanguage === "ar" ? "إرسال" : "SUBMIT"}
                                </Button>
                                {/* button */}
                            </form>
                        </div>
                        <div className="left">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3631.8614155786495!2d54.395469!3d24.455593!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e69e4f5decbcd%3A0xf6ae18193ce01efc!2sSeattle%20%26%20Middle%20East%20Properties%20L.L.C!5e0!3m2!1sar!2seg!4v1722138426197!5m2!1sar!2seg"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={contactOpenSnackbar}
                autoHideDuration={6000}
                onClose={() => setContactOpenSnackbar(false)}
            >
                <Alert onClose={() => setContactOpenSnackbar(false)} severity="success">
                    {contactSnackbarMessage}
                </Alert>
            </Snackbar>
            <div className="h-5vh"></div>
            <div className="h-5vh"></div>

            <Footer />
        </div>
    )
}
