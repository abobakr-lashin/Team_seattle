/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import "./contact.css";
import { v4 as uuidv4 } from 'uuid';
import { MuiTelInput } from 'mui-tel-input';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import app from '../../firebaseConfig';
import { getDatabase, push, ref, set } from 'firebase/database';
import OUREXPERT from '../../Pages/OUREXPERT';
export default function ContactusForm() {
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

        // Clear form after submission
        setContactFormData({ id: uuidv4(), fullName: "", contactPhone: "+971", contactEmail: "", contactMessage: "" });

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
                            maxWidth: "510px",
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
            <Snackbar
                open={contactOpenSnackbar}
                autoHideDuration={6000}
                onClose={() => setContactOpenSnackbar(false)}
            >
                <Alert onClose={() => setContactOpenSnackbar(false)} severity="success">
                    {contactSnackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}
