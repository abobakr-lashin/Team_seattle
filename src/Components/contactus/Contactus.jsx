/* eslint-disable jsx-a11y/iframe-has-title */
import "./contact.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import NavPar from "../appbar/NavPar";

import Footer from "../footer/Footer";

import OUREXPERT from "../../Pages/OUREXPERT";
import ContactusForm from "./ContactusForm";
import { Link } from "react-router-dom";

export default function Contactus() {
  return (
    <div>
      <div className="OurPartners">
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
                <Link to={"/"}>
                  {" "}
                  <KeyboardDoubleArrowRightIcon
                    sx={{ color: "#d3b76d", fontSize: "65px" }}
                  />
                </Link>
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
              <div className="name">Address</div>
              <img src="/uploads/Contactus/locahen.png" alt="erfw" />
              <div className="pragraf">
                Office 1306, Dusit Thani Al Muroor St Abu Dhabi, United Arab
                Emirates
              </div>
            </div>
            <div className="hr2"></div>
            <Link to="tel:+971502135701">
              <div className="address">
                <div className="name">Phone</div>
                <img src="/uploads/Contactus/phone.png" alt="erfw" />
                <div className="pragraf">+971502135701</div>
              </div>
            </Link>
            <div className="hr2"></div>
            <Link to={"mailto:info@seattle-me.com"}>
              <div className="address">
                <div className="name">Email</div>
                <img src="/uploads/Contactus/email.png" alt="erfw" />
                <div className="pragraf">info@seattle-me.com</div>
              </div>
            </Link>
          </div>
          <div className="h-5vh"></div>

          <div className="display2 m-5">
            <Link
              to={
                "https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img
                width={"220px"}
                src="/uploads/Contactus/whatsApp.png"
                alt=""
              />
            </Link>
          </div>
          <div className="h-5vh"></div>

          <div className="display5">
            <ContactusForm />
            <div className="left">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3631.8614155786495!2d54.395469!3d24.455593!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e69e4f5decbcd%3A0xf6ae18193ce01efc!2sSeattle%20%26%20Middle%20East%20Properties%20L.L.C!5e0!3m2!1sar!2seg!4v1722138426197!5m2!1sar!2seg"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="aaasdaswd"

              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="h-5vh"></div>
      <OUREXPERT />

      <div className="h-5vh"></div>

      <Footer />
    </div>
  );
}
