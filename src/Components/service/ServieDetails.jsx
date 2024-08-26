import React, { useState, useEffect } from "react";
import NavPar from "../appbar/NavPar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Slider from "react-slick";
import Footer from "../footer/Footer";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { TextField, Snackbar, Alert } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { v4 as uuidv4 } from "uuid"; // For generating unique ids
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./servieD.css";
import app from "../../firebaseConfig";
import { getDatabase, push, ref, set } from "firebase/database";

export default function ServiceDetails() {

  // Add Data Base FIreBase 
  const db = getDatabase(app);
  const newDocRef = push(ref(db, "services/message"));


  const imgSevrvices = [
    { id: 1, src: "/uploads/img/content/1.png" },
    { id: 2, src: "/uploads/img/content/2.png" },
    { id: 3, src: "/uploads/img/content/3.png" },
    { id: 4, src: "/uploads/img/content/4.png" },
    { id: 5, src: "/uploads/img/content/5.png" },
    { id: 6, src: "/uploads/img/content/6.png" },
  ];

  const ServiceDetails = [
    {
      id: 1,
      src: "/uploads/backgrond/2.png",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      data: "",
      title: "PROPERTY SEARCH",
    },
    {
      id: 2,
      src: "/uploads/backgrond/4.png",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      data: "",
      title: "PROPERTY VALUATION",
    },
    {
      id: 3,
      src: "/uploads/backgrond/back.png",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      data: "",
      title: "PROPERTY LISTINGS",
    },
    {
      id: 4,
      src: "/uploads/backgrond/3.png",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      data: "",
      title: "MARKET ANALYSIS",
    },
    {
      id: 5,
      src: "/uploads/backgrond/1.png",
      p1: "",
      p2: "",
      p3: "",
      p4: "",
      p5: "",
      data: "",
      title: "REAL ESTATE PURCHASE",
    },
    {
      id: 6,
      src: "/uploads/backgrond/1.png",
      p1: "Experience the pinnacle of luxury property management with Seattle & Middle East. We understand that properties are not just investments, but a reflection of our clients discerning taste and lifestyle. Therefore, we offer a comprehensive range of property management services designed to exceed your expectations.",
      p2: "Our team of experienced professionals are dedicated to providing personalized and attentive care to your properties, ensuring that every detail is meticulously handled. From tenant selection and screening to regular property inspections, we go above and beyond to maintain the highest standards of quality and security.",
      p3: "With our extensive network of trusted contractors and service providers, we can handle all aspects of property maintenance, ensuring that your properties are always in pristine condition. Our financial experts will also take care of rent collection, expense management, and detailed financial reporting, providing you with complete transparency and peace of mind.",
      p4: "As clients, you can expect nothing less than exceptional service and attention to detail. We are committed to delivering a seamless and stress-free property management experience, allowing you to enjoy the benefits of your investments without any hassle.",
      p5: "At Seattle & Middle East Property Management we offer the following services:",
      data: `
        <li>Tenant Screening & Placement.</li>
        <li>Rent Collection.</li>
        <li>Property Maintenance & Repairs.</li>
        <li>Lease Agreement Management.</li>
        <li>Financial Management.</li>
        <li>Legal Compliance.</li>
        <li>Vacancy Management.</li>`,
      title: "PROPERTY MANAGEMENT",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    phone: "+971",
    email: "",
    message: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [ServiceDetailsArr, setServiceDetailsArrr] = useState([]);
  const { Servieid } = useParams();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(parseInt(Servieid));
  const [language, setLanguage] = useState(
    navigator.language.startsWith("ar") ? "ar" : "en"
  );

  const imgBg = ServiceDetails.find((i) => i.id === currentId);

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
    setServiceDetailsArrr((prevArr) => {
      const updatedArr = [...prevArr, newEntry];
      console.log("Updated Array:", updatedArr); // Verify the array here
      return updatedArr;
    });

    // Perform any action with formData, e.g., sending to a server
    // console.log("Saved Data:", formData);
    console.log("Saved Data:", ServiceDetailsArr);

    // Clear form after submission
    setFormData({ name: "", phone: "+971", email: "", message: "" });

    // Data Base fire Base 
    set(newDocRef, {
      id: uuidv4(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      servies: imgBg?.title,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString()
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document:", error);
    })

  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  useEffect(() => {
    const servieMember = imgSevrvices.find((img) => img.id === currentId);
    if (!servieMember) {
      navigate("/404");
    }
  }, [currentId, navigate, imgSevrvices]);

  const settings = {
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: true,
    speed: 600,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => {
      setCurrentId(imgSevrvices[next].id);
      navigate(`/servieDetails/${imgSevrvices[next].id}`);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };



  return (
    <>
      <div className="tow">
        <div className="OurPartners">
          <NavPar />
          <Box
            sx={{
              backgroundImage: `url(${imgBg?.src})`,
            }}
            className="img-servies"
          >
            <div className="h-5vh"></div>
            <div className="grop-title">
              <div className="img-dis">
                <img src="/uploads/img/marpa.png" alt="" />
              </div>
              <div
                className="title-dis4"
                style={{ display: "flex", width: "300px", flexWrap: "wrap" }}
              >
                <div>
                  <div>
                    Home
                    <Link to={"/"}>   <KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link>
                    SERVICES
                    {/* <KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }}/> */}
                    <div className="w-f-p" dangerouslySetInnerHTML={{ __html: imgBg?.title || "" }} >

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="display2">
              <div className="">
                <h4 dangerouslySetInnerHTML={{ __html: imgBg?.p1 || "" }}></h4>
                <h4 dangerouslySetInnerHTML={{ __html: imgBg?.p2 || "" }}></h4>
                <h4 dangerouslySetInnerHTML={{ __html: imgBg?.p3 || "" }}></h4>
                <h4 dangerouslySetInnerHTML={{ __html: imgBg?.p4 || "" }}></h4>
                <h4 dangerouslySetInnerHTML={{ __html: imgBg?.p5 || "" }}></h4>
                <ul
                  className="ul"
                  dangerouslySetInnerHTML={{ __html: imgBg?.data || "" }}
                ></ul>
              </div>
              <div className="form2">
                <div
                  className="form3"
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    alignItems: "center",
                  }}
                >
                  <h3>REQUEST QUOTE</h3>
                  <input
                    type="text"
                    value={imgBg?.title || ""}
                    readOnly
                    style={{}}
                  />

                  {/* name */}

                  <input
                    name="name"
                    placeholder={
                      language === "ar" ? "الاسم الكامل" : "Full Name"
                    }
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
                  {/* nuber phone */}
                  <MuiTelInput
                    sx={{
                      width: "100%",
                      maxWidth: "300px",
                      mt: "10px",
                      backgroundColor: "white",
                      borderRadius: "10px",
                      border: "none",
                      outline: "none",
                    }}
                    className="input"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    error={Boolean(phoneError)}
                    helperText={phoneError}
                  />
                  {/* nuber phone */}
                  {/* Email */}
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    label={language === "ar" ? "البريد الإلكتروني" : "Email"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(EmailError)}
                    required
                  />
                  {EmailError && (
                    <div
                      style={{
                        color: "red",
                        top: "100%",
                        left: "5px",
                        margin: "2px",
                        fontSize: "15px",
                      }}
                    >
                      {EmailError}
                    </div>
                  )}
                  {/* Email */}

                  {/* Textarea */}

                  <textarea
                    style={{ whiteSpace: "pre-wrap" }}
                    placeholder="Send Message"
                    name="message"
                    label={language === "ar" ? "الرسالة" : "Message"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    InputProps={{ readOnly: true }} // هذه السطر لمنع التعديل
                  />

                  {/* Textarea */}

                  <button
                    className="serviceD-submit"
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

            <Slider {...settings}>
              {imgSevrvices.map((img) => (
                <Link
                  margin={"20px"}
                  width={"0px"}
                  to={`/servieDetails/${img.id}`}
                  key={img.id}
                >
                  <Box>
                    <img
                      className="img-Esteemed1"
                      src={img.src}
                      alt="Service"
                    />
                  </Box>
                </Link>
              ))}
            </Slider>
          </Box>

          <div className="h-10vh"></div>
          <Footer className="slidr" />
        </div>
      </div>
    </>
  );
}
