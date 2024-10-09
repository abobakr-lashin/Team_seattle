import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavPar from "../appbar/NavPar";
import { Link, useParams } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormContainer from "../appbar/FormContainer";
import Slider from "react-slick";
import { Grid, Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../landingpage/landingpage.css";
import CareersForm from "../contactus/CareersForm";
import ContactusForm from "../contactus/ContactusForm";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import { firestore } from "../../firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default function LandingpageSeattle() {
    const [cartId, setCartId] = useState({});
    const { id } = useParams()

    // Get Data from Firestore
    const GetDataFireStore = async () => {
        try {
            const docRef = doc(firestore, "listBlogsCartSEATTLE", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setCartId(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };


    const settings = {
        centerMode: true,
        centerPadding: "1",
        slidesToShow: 3,
        focusOnSelect: true,
        infinite: true,
        speed: 600,
        // autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };


    const imgsetin = cartId?.imageSlider?.map((img) => {
        return (
            <div key={img} className="slide-item">
                <div
                    className="Landingpage-img"
                    style={{ backgroundImage: `url(${img})` }}
                ></div>
            </div>
        );
    });




    useEffect(() => {
        GetDataFireStore();
    }, [id]);

    const imgsetsin = (
        <div className="dis-play1">
            <div>
                <span>
                    <span>{cartId?.beds}</span> <img src={'/uploads/commercial/export/icon/bed.png'} alt="Bed" />
                </span>
                <div>BEDS</div>
            </div>
            <div>
                <span>
                    <span>{cartId?.baths}</span> <img src={'/uploads/commercial/export/icon/bath.png'} alt="Bath" />
                </span>
                <div>Baths</div>
            </div>
            <div>
                <span>
                    <span>{cartId?.square}</span> <img src={'/uploads/commercial/export/icon/square.png'} alt="Square" />
                </span>
                <div>Square{`{ft}`}</div>
            </div>
            <div>
                <span>
                    <span>{cartId?.parking}</span>
                </span>
                <div>Parking </div>
            </div>
        </div>
    );

    return (
        <div className="Landingpage">
            <div
                className="bg-Landingpage"
                style={{
                    backgroundImage: `url(${cartId?.imageCart})`,
                }}
            >
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
                            OUR PROJECTS
                            <Link to={"/"}>
                                {" "}
                                <KeyboardDoubleArrowRightIcon
                                    sx={{ color: "#d3b76d", fontSize: "65px" }}
                                />
                            </Link>
                            <div style={{ textTransform: "uppercase" }}>
                                {cartId?.title}
                            </div>
                        </h2>
                    </div>
                </div>
                <div className="contbg">
                    <div className="img-samy">
                        <img src={cartId?.imageText} alt="samayas" />
                    </div>
                    <div className="formheader">

                        <FormContainer color={"rgba(255, 255, 255, 0.466)"} />
                    </div>
                </div>

                <div className="slider-container">
                    <Slider {...settings}>{imgsetin}</Slider>
                </div>
            </div>

            <div className="h-5vh"></div>
            <div className="h-5vh"></div>
            <div className="grid-lan" spacing={2} sx={{ margin: "auto", width: "90%", whiteSpace: "pre-wrap" }}>
                <div className="grid-lan1" item lg={8} md={12} sx={{ margin: "auto", width: "90%", whiteSpace: "pre-wrap" }}>
                    <div className="Sitedetails">
                        <div className="address">
                            {cartId?.mainTitle}
                        </div>
                        <div className="theprice">{cartId?.price} ${cartId?.currency}</div>
                        <div className="theprices">${cartId?.monthlyPayment} {cartId?.currency} (per month)</div>
                        <div className="hr3"></div>
                        {imgsetsin}
                        <div className="hr3"></div>
                        <div className="text" dangerouslySetInnerHTML={{ __html: cartId?.text }}></div>
                        <h1> Explore the Area: </h1>
                  
                    </div>
                </div>
                <div item lg={4} md={12} alignItems={"center"} justifyContent={"center"}>
                    <div className="ContactAgent">
                        <div className="title">Contact Agent</div>
                        <div className="imgctext">
                            <div className="imgcontact">
                                <img src={cartId?.bgImage} alt="" />
                            </div>
                            <div className="text">
                                <div className=" Listing">Listing by</div>
                                <div className="name">{cartId?.listingName}</div>
                                <div className="contact ">
                                    <Rating name="size-medium" value={cartId?.stars || 0} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="Email">
                            <a href={`mailto:${cartId?.email}?subject=Subject&body=Hello!`}>
                                Email
                            </a>
                        </div>          </div>
                    <div className="formc">
                        <FormContainer color={"#06404d"} />
                    </div>
                </div>
            </div>
            <div className="map">
                <div className="h-5vh"></div>
                <div>
                    <h3>عرض الخريطة:</h3>

                    <iframe
                        src={cartId?.map}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <ContactusForm />
            </div>
            <div className="h-5vh"></div>
            <Footer />
        </div>
    );
}