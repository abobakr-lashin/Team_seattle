import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Footer from "../footer/Footer";
import "./LatestNews.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import LastNews from "./LastNews";

export default function LatestNews() {
    const [currentPage, setCurrentPage] = useState(1);
    const [FormData, setFormData] = useState([]);

    return (
        <div className="OurPartners">
            <NavPar />
            <div className="h-5vh"></div>
            <div className="grop-title">
                <div className="img-dis">
                    <img src="/uploads/img/marpa.png" alt="" />
                </div>
                <div className="title-dis7">
                    <div>
                        Home{" "}
                        <Link to={"/"}>   <KeyboardDoubleArrowRightIcon  sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link> 

                    </div>
                    <div>BLOGS</div>
                </div>
            </div>
            <div className="h-5vh"></div>

  
  <LastNews newsPerPage={9}/>
            <div className="h-5vh"></div>
            <Footer />
        </div>
    );
}
