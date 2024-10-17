import React, {  useState } from "react";
import { Link } from "react-router-dom";
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Footer from "../footer/Footer";
import "./LatestNews.css";
import LastNews from "./LastNews";
import OUREXPERT from "../../Pages/OUREXPERT";

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
                        <Link to={"/"}>   <KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link>

                    </div>
                    <div>BLOGS</div>
                </div>
            </div>
            <div className="h-5vh"></div>


            <LastNews newsPerPage={9} />
            <div className="h-5vh"></div>
            <OUREXPERT />

            <Footer />
        </div>
    );
}
