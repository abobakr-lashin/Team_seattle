import React from "react";
import NavPar from "../appbar/NavPar";
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Sell.css";
import FormN from "../appbar/FormN";
import Cardsell from "./Cardsell";
import Footer from "../footer/Footer";
export default function Sell() {
  return (
    <div className="Sell">
      <NavPar />
      <div className="h-5vh"></div>

      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7" style={{ display: "flex" }}>
          <h1>
            Home{" "}
            <Link to={"/"}>
              {" "}
              <KeyboardDoubleArrowRightIcon
                sx={{ color: "#d3b76d", fontSize: "65px" }}
              />
            </Link>
            <div style={{ textTransform: "uppercase" }}>sell</div>
          </h1>
        </div>
      </div>
      <div className="img-Sell">
        <h2 style={{ textTransform: "uppercase" }}>
          SELL OR RENT OUT YOUR PROPERTY IN UAE{" "}
        </h2>
        <h3 style={{ textTransform: "uppercase" }}>
          <FormN name={"SEND A REQUEST"} />
        </h3>
      </div>
      <div className="selltitel">

        <h2>BENEFITS OF LISTING YOUR PROPERTY WITH SEATTLE & MIDDLE EAST</h2>
      </div>



      <div className="sellcontact1">

        <div className="textcon1">
          <h3>
            <span>EFFICIENCY IN TIME AND EFFORT</span>
            Our specialized in-house teams manage the entire buying and selling
            process, freeing you from relying on multiple external parties. We
            provide comprehensive support covering legal issues, property
            management, consultations, and documentation processes, equipping
            our experts to handle and manage any challenges that may arise
            during or after the transaction.
          </h3>
        </div>
        <div className="imgcon1">
          <img src="/uploads/sell/export/photo2.png" alt="" />
        </div>
      </div>





      <div className="sellcontact2">

        <div className="imgcon2">
          <img src="/uploads/sell/export/photo3.png" alt="" />
        </div>
        <div className="textcon2">
          <h3>
            <h2>EXPANDING INTERNATIONAL REACH
            </h2>
            We initiate international marketing campaigns at no additional cost to our clients, allowing access to broad global markets including Europe, the United States, the United Kingdom, Asia, and the CIS countries. This strategic approach has quadrupled our potential client base up to the year 2023.


          </h3>
        </div>
      </div>
      <div className="sellcontact1">

        <div className="textcon1">
          <h3>
            <span>EXCEPTIONAL SALES PERFORMANCE
            </span>
            In 2023, Seattle & Middle East experienced a 130% increase in sales compared to the previous year, including closing the largest residential land transaction in Dubai to date.


          </h3>
        </div>
        <div className="imgcon1">
          <img src="/uploads/sell/export/photo4.png" alt="" />
        </div>
      </div>

      <div className="sellcontact2">

        <div className="imgcon2">
          <img src="/uploads/sell/export/photo5.png" alt="" />
        </div>
        <div className="textcon2">
          <h3>
            <h2>LEADERSHIP IN REAL ESTATE
            </h2>
            Through our proven strategies and continuous achievements, we maintain our status as a leading real estate agency with distinguished performance in the market.


          </h3>
        </div>
      </div>

      <div className="sellcontact1">

        <div className="textcon1">
          <h3>
            <span>MAXIMIZING RETURN ON YOUR INVESTMENT
            </span>
            Leveraging the deep market knowledge of our sales team, we provide you with advice on optimal sales and leasing strategies. We ensure your property is competitively priced to align with current market trends, enhancing your chances of achieving profitable returns.


          </h3>
        </div>
        <div className="imgcon1">
          <img src="/uploads/sell/export/photo6.png" alt="" />
        </div>
      </div>
      <div className="h-5vh"></div>

      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7" style={{ display: "flex" }}>
          <h2>
            <div style={{ textTransform: "uppercase", }}>
              OFFPLAN LATEST LAUNCHES

            </div>
          </h2>
        </div>
      </div>
      <div className="h-5vh"></div>
      <div className="h-5vh"></div>
      <Cardsell />
      <div className="h-5vh"></div>
      <div className="img-Developers1">
        <div className="h-5vh"></div>
        <div className="h-5vh"></div>
        <h2 style={{ textTransform: "uppercase" }}>OUR EXPERT WILL HELP YOU </h2>
        <h5 style={{ textTransform: "uppercase" }}>Feel free to contact us at any time, we are online 24/7</h5>
        <h4 style={{ textTransform: "uppercase" }}><FormN name={"CONTACT US"} /></h4>



      </div>
      <div className="h-5vh"></div>
      <Footer />
    </div>
  );
}
