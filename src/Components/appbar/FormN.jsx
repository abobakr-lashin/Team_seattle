import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Snackbar, styled, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MuiTelInput } from 'mui-tel-input';
import "./FormN.css"
import { getDatabase, push, ref, set } from 'firebase/database';
import app from '../../firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({

  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: '50vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '90%',
    maxWidth: '500px',
    height: 'auto',
    maxHeight: '60vh',
    boxShadow: 'none',
    border: 'none',
    backgroundColor: 'transparent',
  }
}));


export default function FormN({name}) {

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    phone: "+971",
    email: "",
  });


  // Post Data To fireBase
  const db = getDatabase(app)
  const newDocRef = push(ref(db, 'specials/offers'))

  // console.log(newDocRef);
  // console.log(formData);


  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [language, setLanguage] = useState(
    navigator.language.startsWith("ar") ? "ar" : "en"
  );

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

  const handleButtonClick = (event) => {
    event.preventDefault();


    // Add Data Post Firebase \
    set(newDocRef, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString()
    }).then(() => {
      console.log('Data sent successfully');
      setFormData({ id: uuidv4(), name: "", phone: "+971", email: "", message: "", requiredService: "" });
    }).catch((error) => {
      console.error('Error sending data: ', error);
    });

    // setFormData({ id: uuidv4(), name: "", phone: "+971", email: "", message: "", requiredService: "" });

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

    // Validate email
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

    // Validate required service
    if (formData.requiredService === "") {
      setServiceError(
        language === "ar"
          ? "يجب اختيار خدمة"
          : "Required Service must be selected"
      );
      return;
    } else {
      setServiceError("");
    }

    // If validation passes
    setSnackbarMessage(
      language === "ar"
        ? "تم تسجيل اهتمامك بنجاح!"
        : "Your interest has been registered successfully!"
    );
    setOpenSnackbar(true);


    console.log("Saved Data:", formData);

    // Clear form after submission

  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const { Servieid } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(parseInt(Servieid));

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <div id='FormN'>
        <Button className="btn-RE11" onClick={handleClickOpen}>
         {name}    </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle className='wh-form1'>

            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                backgroundColor: "#d3b76d",
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
            <form>
              {/* name */}
              <input
                name="name"
                placeholder={language === "ar" ? "الاسم الكامل" : "Full Name"}
                value={formData.name}
                onChange={handleChange}
                className={nameError ? "error" : ""}
                style={{
                  padding: "8px",
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
              {/* name */}
              <div className="br"></div>
              {/* email */}
              <input
                type="email"
                placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  padding: "8px",
                  marginBottom: "8px",
                  boxSizing: "border-box",
                }}
                className={emailError ? "error" : ""}
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
              {/* email */}
              {/* phone */}
              <MuiTelInput
                sx={{
                  backgroundColor: "white  !important",
                  border: "none !important", // إزالة الحدود الافتراضية
                  outline: "none !important", // إزالة الـ outline
                  borderRadius: "20px", // الاحتفاظ بالزوايا المستديرة
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  justifyContent: "center",
                  maxWidth: '200px !important', // الحد الأقصى للعرض
                  height: '50px', // تحديد الطول
                  boxShadow: 'none !important', // إزالة أي تأثيرات ظل
                  "& .MuiOutlinedInput-root": {
                    border: "none", // إزالة الحدود من مكون داخلي
                    outline: "none", // إزالة الـ outline من مكون داخلي
                  },
                  "& .MuiInputBase-root": {
                    border: "none", // إزالة الحدود من مكون داخلي آخر
                    outline: "none", // إزالة الـ outline من مكون داخلي آخر
                  },
                  "& .Mui-focused": {
                    outline: "none", // إزالة الـ outline عند التركيز
                    border: "none !important", // إزالة أي حدود محتملة عند التركيز
                    boxShadow: "none !important", // إزالة أي تأثير ظل عند التركيز
                  },
                  "& .Mui-error": {
                    border: "none", // إزالة الحدود عند حدوث خطأ
                  },
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: "red", // تغيير لون نص المساعدة إلى الأحمر عند الخطأ
                    position: "fixed",
                    top: "50%"
                  },
                }}
                value={formData.phone}
                onChange={handlePhoneChange}
                error={Boolean(phoneError)}
                helperText={phoneError}
              />

              {/* phone */}
              <div className="contact-icons">
                <Link to="tel:+971502135701" className="">
                  <img src="/uploads/img/mobile.png" alt="mobile" />
                </Link>
                <Link to="tel:+971502135701" className="">
                  <img src="/uploads/img/whatsapp.png" alt="whatsapp" />
                </Link>
              </div>
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
                onClick={handleButtonClick}
              >
                {language === "ar" ? "إرسال" : "SUBMIT"}
              </Button>
              {/* button */}
            </form>
          </DialogTitle>
          <DialogContent dividers></DialogContent>
        </BootstrapDialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </>
  );
}
