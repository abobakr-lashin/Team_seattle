import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import CounterBox from "./CounterBox"; // تأكد من تحديث مسار الاستيراد وفقًا لموقع الملف
import "./Discover.css";
import FormMs from "../morttgage/FormMS"
import Counternuber from "./Counternuber";
export default function Discover() {


  return (
    <div className="Discover">
      <div className="body-img">
        {/* <div className="h-5vh"></div> */}
  <Counternuber/>
        <div className="h-6vh"></div>

        <div className="grop-title1">
          <div className="img-dis">
            <img src="./uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis3">
            <h2>DISCOVER</h2>
            <h3>SEATTLE & MIDDLE EAST GROUP</h3>
          </div>
        </div>

        <div className="prgraf">
          <p>
            Seattle & Middle East Group is a leader in providing exceptional
            professional services across Real Estate, Travel, Contracting,
            Mortgage, and Digital Marketing. <br /> 
             We are committed to delivering
            tailored solutions that meet the unique needs of our clients. <br />
          </p>
          <p>
            Our expert team in Real Estate helps you find ideal residential,
            commercial, or investment properties. <br />
             Our Travel Services offer
            seamless and memorable journeys, while our Mortgage team
            provides comprehensive financing guidance. <br />
             Our Digital Marketing
            Agency boosts your brand's online presence with cutting-edge
            strategies.
          </p>
          <p>
            Professionalism, integrity, and customer satisfaction are our core
            values.
          </p>
        </div>

 <FormMs/>
 <br />
 <br />
      </div>

    </div>
  );
}
