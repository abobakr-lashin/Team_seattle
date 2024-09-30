import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavPar from "../appbar/NavPar";
import { Link, useParams } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormContainer from "../appbar/FormContainer";
import Slider from "react-slick";
import { Grid, Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CareersForm from "../contactus/CareersForm";
import ContactusForm from "../contactus/ContactusForm";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import { firestore } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./landingpage.css";

export default function LandingPageBuy() {
    const [cartId, setCartId] = useState([]);
    const { id } = useParams()

    // Get Data from Firestore
    const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartBuy"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCartId(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    const filterCartId = cartId.filter((it) => it.id === id);

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


    const imgsetin = filterCartId[0]?.imageSlider?.map((img) => {
        return (
            <div key={img} className="slide-item">
                <div
                    className="Landingpage-img"
                    style={{ backgroundImage: `url(${img})` }}
                ></div>
            </div>
        );
    });


    // خريطه
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    const MyMap = () => {
        // إحداثيات افتراضية للموقع (دبي، الإمارات)
        const position = [24.455818, 54.395480];

        return (
            <div>
                <h2>خريطة الموقع</h2>
                {/* حاوية الخريطة */}
                <MapContainer center={position} zoom={13} style={{ height: "500px", width: "80vw" }}>
                    {/* طبقة الخريطة من OpenStreetMap */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* علامة الموقع */}
                    <Marker position={position}>
                        <Popup>
                            موقع افتراضي في دبي.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        );
    };
    const position = [25.276987, 55.296249];

    // خريطه


    useEffect(() => {
        GetDataFireStore();
    }, [id]);

    console.log(filterCartId[0]?.stars);

    const imgsetsin = filterCartId?.map((it) => (
        <div className="dis-play1">
            <div>
                <span>
                    <span>{it.beds}</span> <img src={'/uploads/commercial/export/icon/bed.png'} alt="Bed" />
                </span>
                <div>BEDS</div>
            </div>
            <div>
                <span>
                    <span>{it.baths}</span> <img src={'/uploads/commercial/export/icon/bath.png'} alt="Bath" />
                </span>
                <div>Baths</div>
            </div>
            <div>
                <span>
                    <span>{it.square}</span> <img src={'/uploads/commercial/export/icon/square.png'} alt="Square" />
                </span>
                <div>Square{`{ft}`}</div>
            </div>
            <div>
                <span>
                    <span>{it.parking}</span>
                </span>
                <div>Parking </div>
            </div>
        </div>
    ));

    return (
        <div className="Landingpage">
            <div
                className="bg-Landingpage"
                style={{
                    backgroundImage: `url(${filterCartId[0]?.imageCart})`,
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
                            <div style={{ textTransform: "uppercase", width: '80%' }}>
                                {filterCartId[0]?.title}
                            </div>
                        </h2>
                    </div>
                </div>
                <div className="contbg">
                    <div className="img-samy">
                        <img src="/uploads/landingpage/export/icon/samayas.png" alt="samayas" />
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
            <div className="grid-lan" spacing={2} sx={{ margin: "auto", width: "90%", whiteSpace: "pre-wrap" }}>
                <div className="grid-lan1" item lg={8} md={12} sx={{ margin: "auto", width: "90%", whiteSpace: "pre-wrap" }}>
                    <div className="Sitedetails">
                        <div className="address">
                            {filterCartId[0]?.location}
                        </div>
                        <div className="theprice">{filterCartId[0]?.price} ${filterCartId[0]?.currency}</div>
                        <div className="theprices">${filterCartId[0]?.monthlyPayment} {filterCartId[0]?.currency} (per month)</div>
                        <div className="hr3"></div>
                        {imgsetsin}
                        <div className="hr3"></div>
                        <div className="text" dangerouslySetInnerHTML={{ __html: filterCartId[0]?.text }}></div>
                        <h1> Explore the Area: </h1>
                        <h4>
                            {" "}
                            <LocationOnIcon /> Location: Mohammed Bin Rashid City{" "}
                        </h4>
                    </div>
                </div>
                <div item lg={4} md={12} alignItems={"center"} justifyContent={"center"}>
                    <div className="ContactAgent">
                        <div className="title">Contact Agent</div>
                        <div className="imgctext">
                            <div className="imgcontact">
                                <img src={filterCartId[0]?.bgImage} alt="" />
                            </div>
                            <div className="text">
                                <div className=" Listing">Listing by</div>
                                <div className="name">{filterCartId[0]?.listingName}</div>
                                <div className="contact ">
                                    <Rating name="size-medium" value={filterCartId[0]?.stars || 0} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="Email">
                            <a href="mailto:someone@example.com?subject=Subject&body=Hello!">
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
                <iframe
                    src={filterCartId[0]?.map}
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>                                <ContactusForm />
            </div>
            <div className="h-5vh"></div>
            <Footer />
        </div>
    );
}
