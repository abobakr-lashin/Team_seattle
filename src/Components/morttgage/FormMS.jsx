import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Snackbar, styled, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./formMs.css";
import { MuiTelInput } from 'mui-tel-input';
import { getDatabase, push, ref, set } from 'firebase/database';
import app from '../../firebaseConfig';
import "../our-project/project.css"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    maxHeight: 'auto', // الحد الأقصى للطول مع تفعيل التمرير العمودي
    overflowY: 'auto', // تفعيل التمرير العمودي
    overflowX: 'hidden', // منع التمرير الأفقي
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '& .MuiPaper-root': {
    width: '90%', // تعيين العرض
    maxWidth: '100%', // الحد الأقصى للعرض
    height: 'auto', // تعيين الطول
    maxHeight: '90vh', // الحد الأقصى للطول كنسبة من ارتفاع النافذة
    backgroundColor: 'transparent', // جعل الخلفية شفافة
    border: 'none', // إزالة الحدود
    boxShadow: 'none', // إزالة الظل إذا كان هناك أي ظل
  }
}));

export default function FormMS() {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    phone: "+971",
    email: "",
    message: "",
    requiredService:'',
  });
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [FormMSArr, setFormMSArr] = useState([]);
  const [language, setLanguage] = useState(
    navigator.language.startsWith("ar") ? "ar" : "en"
  );


  // Add Data Server FireBase 
  const db = getDatabase(app);
  const newData = push(ref(db, 'Quote/massages'))


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

    // Add data to array
    const newEntry = { id: uuidv4(), ...formData };
    setFormMSArr((prevArr) => {
      const updatedArr = [...prevArr, newEntry];
      // console.log("Updated Array:", updatedArr); // Verify the array here
      return updatedArr;
    });

    // Perform any action with formData, e.g., sending to a server
    // console.log("Saved Data:", formData);

    // Clear form after submission
    setFormData({ id: uuidv4(), name: "", phone: "+971", email: "", message: "", requiredService: "" });

    // Send Data to server fire Base 
    set(newData, {
      id: formData.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      requiredService: formData.requiredService,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString()
    }).then(() => {
      // console.log("Data saved successfully!");
    }).catch(err => {
      // console.error("Error saving data: ", err);
    })
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


  useEffect(() => {
    setLanguage(navigator.language.startsWith("ar") ? "ar" : "en");
  }, []);

  return (
    <div>
      <Button className="btn-RE1" onClick={handleClickOpen}>
        Register your interest
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle className='wh-form'>
          <h3>Request Quote</h3>
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
              placeholder={language === "ar" ? "الاسم الكامل" : " Name"}
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
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                borderRadius: "100px", // تخصيص الزوايا المستديرة بـ 20 بكسل
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: '800px', // تحديد العرض الثابت بـ 800 بكسل
                // maxWidth: '100%', // التأكد من عدم تجاوز عرض الحاوية إذا كان 100% أو أقل
              }}
              value={formData.phone}
              onChange={handlePhoneChange}
              error={Boolean(phoneError)}
              helperText={phoneError}
            />
            {/* phone */}
            {/* Radio */}
            <FormControl>
              <FormLabel id="required-service-label">
                {language === "ar" ? "الخدمة المطلوبة" : "Required Service"}
              </FormLabel>
              <RadioGroup
                aria-labelledby="required-service-label"
                name="requiredService"
                value={formData.requiredService}
                onChange={handleChange}
                row
              >
                <div className="dispaly5">
                  <div>
                    <FormControlLabel value="Ticketing Services" control={<Radio />} label={language === "ar" ? "خدمات التذاكر" : "Ticketing Services"} />
                    <FormControlLabel value="UAE Visas" control={<Radio />} label={language === "ar" ? "تأشيرات الإمارات" : "UAE Visas"} />
                    <FormControlLabel value="Hotel Bookings" control={<Radio />} label={language === "ar" ? "حجوزات الفنادق" : "Hotel Bookings"} />
                    <FormControlLabel value="Travel Insurance" control={<Radio />} label={language === "ar" ? "تأمين السفر" : "Travel Insurance"} />
                  </div>
                  <div>
                    <FormControlLabel value="International Visa Assistance" control={<Radio />} label={language === "ar" ? "مساعدة فيزا دولية" : "International Visa Assistance"} />
                    <FormControlLabel value="Corporate Travel Assistance" control={<Radio />} label={language === "ar" ? "مساعدة السفر للشركات" : "Corporate Travel Assistance"} />
                    <FormControlLabel value="Transportation" control={<Radio />} label={language === "ar" ? "النقل" : "Transportation"} />
                  </div>
                </div>
              </RadioGroup>
              {serviceError && (
                <div
                  style={{
                    color: "red",
                    top: "100%",
                    left: "5px",
                    margin: "2px",
                    fontSize: "15px",
                  }}
                >
                  {serviceError}
                </div>
              )}
            </FormControl>
            {/* Radio */}
            {/* Textarea */}
            <textarea
              placeholder={language === "ar" ? "الرسالة" : "Message"}
              name="message"
              label={language === "ar" ? "الرسالة" : "Message"}
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
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
  );
}
