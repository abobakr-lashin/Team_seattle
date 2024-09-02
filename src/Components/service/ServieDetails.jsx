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
      p1: "Whether you're looking to buy, rent, or invest, our property search services in Seattle and the Middle East offer unparalleled access to a diverse range of real estate options. We understand the unique characteristics of each market and provide personalized guidance to help you find the perfect property that matches your needs and preferences.",
      p2: "Seattle Property Search:Our expert team in Seattle leverages deep local knowledge and cutting-edge technology to help you navigate the dynamic property market. From waterfront homes to urban condos, we offer a curated selection of listings that suit a variety of lifestyles and budgets. Our comprehensive search services ensure that you find the ideal property in this vibrant city.",
      p3: "Middle East Property Search:In the Middle East, our property search services are tailored to meet the diverse needs of clients across the region. Whether you're seeking a luxury villa, a commercial space, or an investment opportunity, we provide access to an extensive inventory of properties in prime locations. Our team of specialists works closely with you to ensure that your property search is efficient, transparent, and rewarding.",
      p4: "With a commitment to excellence, our property search services in Seattle and the Middle East are designed to simplify your real estate journey, providing you with the confidence and support you need to make informed decisions.",
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
      p1: "Understanding market dynamics is key to successful real estate investments. At Seattle & Middle East, our Market Analysis services provide in-depth insights into the property markets in the Middle East, helping you make informed decisions and capitalize on opportunities.",
      p2: "Seattle Market Analysis:Our market analysis team in Seattle delivers detailed reports on the local real estate market, including trends, pricing, and demand. Whether you’re a buyer, seller, or investor, our analysis gives you a comprehensive view of the market landscape, enabling you to identify the best opportunities and make strategic decisions. We analyze key factors such as neighborhood growth, economic indicators, and property types to give you a competitive edge.",
      p3: "Middle East Market Analysis:In the Middle East, our market analysis services offer a deep dive into one of the most dynamic real estate markets in the world. We provide insights into market trends, regional developments, and investment potential across various sectors, including residential, commercial, and industrial properties. Our analysis is tailored to reflect the unique characteristics of the Middle Eastern market, helping you navigate its complexities with confidence.",
      p4: "With a commitment to providing actionable insights, UAE Market Analysis services in Seattle and the Middle East equip you with the knowledge needed to make well-informed real estate decisions and achieve your investment goals.",
      p5: "",
      data: "",
      title: "PROPERTY LISTINGS",
    },
    {
      id: 4,
      src: "/uploads/backgrond/3.png",
      p1: "Understanding market dynamics is key to successful real estate investments. At Seattle & Middle East, our Market Analysis services provide in-depth insights into the property markets in the Middle East, helping you make informed decisions and capitalize on opportunities.",
      p2: "Seattle Market Analysis:Our market analysis team in Seattle delivers detailed reports on the local real estate market, including trends, pricing, and demand. Whether you’re a buyer, seller, or investor, our analysis gives you a comprehensive view of the market landscape, enabling you to identify the best opportunities and make strategic decisions. We analyze key factors such as neighborhood growth, economic indicators, and property types to give you a competitive edge.",
      p3: "Middle East Market Analysis:In the Middle East, our market analysis services offer a deep dive into one of the most dynamic real estate markets in the world. We provide insights into market trends, regional developments, and investment potential across various sectors, including residential, commercial, and industrial properties. Our analysis is tailored to reflect the unique characteristics of the Middle Eastern market, helping you navigate its complexities with confidence.",
      p4: "With a commitment to providing actionable insights, UAE Market Analysis services in Seattle and the Middle East equip you with the knowledge needed to make well-informed real estate decisions and achieve your investment goals.",
      p5: "",
      data: "",
      title: "MARKET ANALYSIS",
    },
    {
      id: 5,
      src: "/uploads/backgrond/1.png",
      p1: "Purchasing real estate is a significant investment, and at Seattle & middle East , we are dedicated to guiding you through every step of the process. Whether you’re buying in UAE, our expert team provides the support and insights you need to make a confident and informed purchase.",
      p2: "Seattle Real Estate Purchase:In Seattle, our real estate purchase services offer a comprehensive approach to finding and securing your ideal property. From initial consultation to closing, we assist with market research, property tours, negotiations, and legalities. Our deep understanding of UAE diverse neighborhoods and market trends ensures that you find a property that aligns with your lifestyle and financial goals.",
      p3: "Middle East Real Estate Purchase:Our services in the UAE are tailored to navigate the region’s unique property landscape. We offer access to a wide range of residential, commercial, and investment properties across key locations. With a focus on personalized service, we guide you through the complexities of purchasing real estate in the Middle East, including legal considerations, market conditions, and cultural nuances.",
      p4: "At Seattle & Middle East, we strive to make your real estate purchase experience seamless and successful, providing the expertise and resources necessary to help you secure the perfect property in UAE",
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
