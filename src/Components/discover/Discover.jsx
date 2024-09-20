import React, { useEffect, useState, useRef } from "react";
import { Grid } from "@mui/material";
import CounterBox from "./CounterBox"; // تأكد من تحديث مسار الاستيراد وفقًا لموقع الملف
import "./Discover.css";
import FormMs from "../morttgage/FormMS";
import Counternuber from "./Counternuber";
export default function Discover() {
  return (
    <div className="Discover">
      <div className="body-img">
        {/* <div className="h-5vh"></div> */}
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
            Seattle{` `} & {` ${' \  '}  `} Middle East Group is a leader in providing
            <br />
            exceptional professional services across real estate,
            <br /> travel, contracting, mortgage, and digital marketing.
            <br />
            We are committed to delivering tailored solutions that
            <br />
            meet the unique needs of our clients. 
            <br />
            <br />
            Our expert team in real estate
            helps you find ideal <br /> residential, commercial, or investment
            properties. <br />
            Our travel services offer seamless and memorable <br /> journeys, while our
            mortgage team provides
            <br />
            comprehensive financing guidance. Our digital<br /> marketing agency
            boosts your brand's online <br /> 
            presence with cutting-edge strategies.
            <br />
            <br />
            Professionalism, integrity, and customer satisfaction are our core
            values.
            <br />
          </p>
        </div>

        <FormMs />
        <br />
        <br />
      </div>
    </div>
  );
}
