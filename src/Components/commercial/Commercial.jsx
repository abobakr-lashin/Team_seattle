import React from "react";
import "./Commercial.css";
import { Link } from "react-router-dom";
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormN from "../appbar/FormN";
import SaleIn from "./SaleIn";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Footer from "../footer/Footer";
import OUREXPERT from "../../Pages/OUREXPERT";

export default function Commercial() {
  return (
    <div className="Commercial">
      <NavPar />
      <div className="h-5vh"></div>

      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7" style={{ display: "flex" }}>
          <h2>
            Home{" "}
            <Link to={"/"}>
              {" "}
              <KeyboardDoubleArrowRightIcon
                sx={{ color: "#d3b76d", fontSize: "65px" }}
              />
            </Link>
            <div style={{ textTransform: "uppercase" }}>Commercial</div>
          </h2>
        </div>
      </div>
      <br />

      <div className="img-Commercial">
        <h2 style={{ textTransform: "uppercase" }}>
          COMMERCIAL PROPERTIES SEND A REQUEST
        </h2>
        <h3 style={{ textTransform: "uppercase" }}>
          <FormN name={"SEND A REQUEST"} />
        </h3>
      </div>

      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7" style={{ display: "flex" }}>
          <h2>
            <div style={{ textTransform: "uppercase" }}>WHO WE ARE</div>
          </h2>
        </div>
      </div>

      <div className="display2">
        <div className="address1">
          <img
            className="imgexportcommercial"
            src="/uploads/commercial/export/icon/benefits.png"
            alt="benefits"
          />
          <div className="pragraf">
            <h1>15</h1> YEARS OF EXCELLENCE
          </div>
        </div>
        <div className="hr2"></div>
        <div className="address1">
          <img
            className="imgexportcommercial"
            src="/uploads/commercial/export/icon/expert.png"
            alt="benefits"
          />
          <div className="pragraf">A TEAM OF NEARLY 100 EMPLOYEES</div>
        </div>
        <div className="hr2"></div>
        <div className="address1">
          <img
            className="imgexportcommercial"
            src="/uploads/commercial/export/icon/multilingual.png"
            alt="benefits"
          />
          <div className="pragraf">EXPERTISE IN 6 LANGUAGES</div>
        </div>
        <div className="hr2"></div>

        <div className="address1">
          <img
            className="imgexportcommercial"
            src="/uploads/commercial/export/icon/increase.png"
            alt="benefits"
          />
          <div className="pragraf">AED 4 BILLION IN SALES IN 2023</div>
        </div>
      </div>
      <div className="h-5vh"></div>

      <div className="title-imags1">
        <div className="title-Commercial1">
          <h3>
            <span style={{ fontWeight: "bolder", listStyle: "inside" }}>
              {" "}
              At Seattle & Middle East,{" "}
            </span>
            we pride ourselves on being a fundamental support for landlords,
            tenants, and buyers. Our commercial property department offers
            comprehensive services encompassing various commercial assets
            including office spaces, retail units, shops, warehouses, commercial
            villas, entire buildings, factories, showrooms, land plots, labor
            camps, and staff accommodation.
          </h3>
          <div className="imags1">
            <img src="/uploads/commercial/export/photo2.png" alt="asdasd" />
          </div>
   
        </div>
        <div className="title-Commercial2">
          <h3>
          To ensure you make the best decision, our experts will select the ideal commercial space tailored to your requirements, considering factors like location, budget, and expected return on investment, enabling you to achieve lucrative earnings.


          </h3>
          <div className="imags1">
            <img className="img3" src="/uploads/commercial/export/photo3.png" alt="asdasd" />
          </div>
   
        </div>
        <div className="title-Commercial2">
          <h3>
          
              Choosing Seattle & Middle East for commercial property services means you are supported by a network of commercial real estate experts with over 15 years of experience in the UAE market.


          </h3>
          <div className="imags1">
            <img src="/uploads/commercial/export/photo4.png" alt="asdasd" />
          </div>
   
        </div>
        <div className="title-Commercial2">
          <h3>
          Our strong team of experts provides full support, following every step of your journey in the commercial real estate world in Dubai and Abu Dhabi. Our services extend beyond brokerage to include consultancy, appraisal, and property management.


          </h3>
          <div className="imags1">
            <img src="/uploads/commercial/export/photo5.png" alt="asdasd" />
          </div>
   
        </div>
  

      
      </div> 
      <div className="h-5vh"></div>

  

      <SaleIn />


      <OUREXPERT/>

<Footer/>
    </div>
  );
}
