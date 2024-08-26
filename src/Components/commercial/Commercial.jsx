import React from "react";
import NavPar from "../appbar/NavPar";
import { Link } from "react-router-dom";
import "./Commercial.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormN from "../appbar/FormN";
import SaleIn from "./SaleIn";

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
            <div style={{ textTransform: "uppercase",}}>Commercial</div>
          </h2>
        </div>
      </div>
      <br />

      <div className="img-Commercial">
        <h2 style={{ textTransform: "uppercase" }}>Developers in uae</h2>
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
            <div style={{ textTransform: "uppercase", }}>WHO WE ARE</div>
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
            Office 1306, Dusit Thani Al Muroor St Abu Dhabi, United Arab
            Emirates
          </div>
        </div>
        <div className="hr2"></div>
        <div className="address1">
          <img
            className="imgexportcommercial"
            src="/uploads/commercial/export/icon/expert.png"
            alt="benefits"
          />
          <div className="pragraf">+971502135701</div>
        </div>
        <div className="hr2"></div>
        <div className="address1">
          <img
            className="imgexportcommercial"
            src="/uploads/commercial/export/icon/multilingual.png"
            alt="benefits"
          />
          <div className="pragraf">info@seattle-me.com</div>
        </div>
        <div className="hr2"></div>

        <div className="address1">
          <img
            className="imgexportcommercial"
            src="/uploads/commercial/export/icon/increase.png"
            alt="benefits"
          />
          <div className="pragraf">info@seattle-me.com</div>
        </div>
      </div>
      <div className="h-5vh"></div>

      <div className="title-imags1">
        <div className="title-Commercial1">
          <h3>
           <span style={{fontWeight:"bolder",listStyle:"inside"}}> Lorem ipsum dolor sit amet, </span>consectetur adipisicing elit. Illum,
            doloremque in quibusdam a, ipsam incidunt voluptatem molestias, quae
            eligendi fuga saepeeos dicta harum magnam sunt! Dolorem assumenda
            non nam!Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Illum, doloremque in quibusdam a, ipsam incidunt voluptatem
            molestias, quae eligendi fuga saepeeos dicta harum magnam sunt!
            Dolorem Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Illum, quae eligendi fuga saepeeos dicta harum magnam sunt! Dolorem
            quae eligendi fuga saepeeos dicta harum magnam sunt! Dolorem
          </h3>
        </div>

        <div className="imags1">
          <img  src="/uploads/commercial/export/photo2.png" alt="asdasd" />
        </div>
      </div>
      <div className="title-imags1">
        <div className="title-Commercial1">
          <h3>
           <span style={{fontWeight:"bolder",listStyle:"inside"}}> Lorem ipsum dolor sit amet, </span>consectetur adipisicing elit. Illum,
            doloremque in quibusdam a, ipsam incidunt voluptatem molestias, quae
            eligendi fuga saepeeos dicta harum magnam sunt! Dolorem assumenda
            non nam!Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Illum, doloremque in quibusdam a, ipsam incidunt voluptatem
            molestias, quae eligendi fuga saepeeos dicta harum magnam sunt!
            Dolorem Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Illum, quae eligendi fuga saepeeos dicta harum magnam sunt! Dolorem
            quae eligendi fuga saepeeos dicta harum magnam sunt! Dolorem
          </h3>
        </div>

        <div className="imags2">
          <img  src="/uploads/commercial/export/photo3.png" alt="asdasd" />
        </div>
      </div>
      <div className="title-imags1">
        <div className="title-Commercial1">
          <h3>
           <span style={{fontWeight:"bolder",listStyle:"inside"}}> Lorem ipsum dolor sit amet, </span>consectetur adipisicing elit. Illum,
            doloremque in quibusdam a, ipsam incidunt voluptatem molestias, quae
            eligendi fuga saepeeos dicta harum magnam sunt! Dolorem assumenda
            non nam!Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Illum, doloremque in quibusdam a, ipsam incidunt voluptatem
        
          </h3>
          <h3>
           <span style={{fontWeight:"bolder",listStyle:"inside"}}> Lorem ipsum dolor sit amet, </span>consectetur adipisicing elit. Illum,
            doloremque in quibusdam a, ipsam incidunt voluptatem molestias, quae
            eligendi fuga saepeeos dicta harum magnam sunt! Dolorem assumenda
            non nam!Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Illum, doloremque in quibusdam a, ipsam incidunt voluptatem
        
          </h3>
        </div>

        <div className="imags3">
          <img  src="/uploads/commercial/export/photo5.png" alt="asdasd" />
          <img  src="/uploads/commercial/export/photo4.png" alt="asdasd" />
        </div>
      </div>


       <div className="h-5vh"></div>

       <div className="h-5vh"></div>

      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7" style={{ display: "flex" }}>
          <h2>
            <div style={{ textTransform: "uppercase" ,fontSize:"50px"}}>offices for sale in uae</div>
          </h2>
        </div>
      </div>

      <SaleIn/>
    </div>
  );
}
