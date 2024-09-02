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
            Seattle & Middle East Group excels in delivering comprehensive,
            professional services across Real Estate, Mortgage, Tourism,
            Contracting, and Digital Marketing sectors.
            <br />
            Our organization encompasses a diverse range of companies, including
            Seattle & Middle East Real Estate, JNJ Mortgage and Spartan Tourism,
            allowing us to offer a full spectrum of services. Clients can
            seamlessly navigate the process of purchasing real estate, securing
            financing, and arranging travel, all within our integrated network.
            <br />
          </p>
          <p>
            Our Real Estate division specializes in identifying the perfect
            residential, commercial, or investment properties. Concurrently, our
            Mortgage team at JNJ Mortgage provides expert guidance on financing
            options, ensuring a smooth acquisition process. Spartan Tourism
            enhances your experience with exceptional travel services, designed
            to make your journey as effortless and enjoyable as possible.
            <br />
            At Seattle & Middle East Group, we uphold the highest standards of professionalism, integrity, and customer satisfaction.
           
          </p>
        </div>

        <FormMs />
        <br />
        <br />
      </div>
    </div>
  );
}
