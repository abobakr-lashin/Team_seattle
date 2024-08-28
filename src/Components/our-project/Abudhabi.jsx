import React from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link } from "react-router-dom";
import NavPar from "../appbar/NavPar";
import Footer from "../footer/Footer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./project.css";
import FormN from "../appbar/FormN";
import AbudhabiDetails from "./AbudhabiDetails";

export default function Abudhabi() {

  return (
    <div className="OurProjects">
      <NavPar />
      <div className="grop-title1 ">
        <div className="img-dis">
          <img src="./uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis6">
          <h2>
            Home
            <Link to={"/"}>
              {" "}
              <KeyboardDoubleArrowRightIcon
                sx={{ color: "#d3b76d", fontSize: "65px" }}
              />
            </Link>
          </h2>
          <h3>AREAS</h3>
        </div>
      </div>


      <div className="h-5vh"></div>
   <AbudhabiDetails/>
      <div className="img-Developers1">
        <div className="h-5vh"></div>
        <div className="h-5vh"></div>
        <h2 style={{ textTransform: "uppercase" }}>
          OUR EXPERT WILL HELP YOU{" "}
        </h2>
        <h5 style={{ textTransform: "uppercase" }}>
          Feel free to contact us at any time, we are online 24/7
        </h5>
        <h4 style={{ textTransform: "uppercase" }}>
          <FormN name={"CONTACT US"} />
        </h4>
      </div>

      <div className="h-5vh"></div>
      <Footer />
    </div>
  );
}
