import React, { useEffect, useState } from "react";
import FormN from "../appbar/FormN";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Footer from "../footer/Footer";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Grid } from "@mui/material";
import "./Commercial.css";

const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-prev-arrow`}
        onClick={onClick}
      >
        <span></span>
      </div>
    );
  };
  
  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} custom-next-arrow`}
        onClick={onClick}
      >
        {/* يمكنك استخدام أي محتوى تريده هنا مثل نص أو عنصر SVG */}
        <span></span> {/* استخدام رمز "أكبر من" كرمز سهم */}
      </div>
    );
  };
  
export default function SaleIn() {
    const [data, setData] = useState([])

    const settings = {
        centerMode: false,
        centerPadding: "auto",
        slidesToShow: 3,
        focusOnSelect: true,
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
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
    // Get Data from Firestore
    const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listingsBlogs"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        GetDataFireStore();
    }, []);

    const imgsetin = data.map((it) => {
        return(
            <Grid key={it.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>

        <Link to={`/Commercial/${it.category}/${it.id}`}  >
        <div className="CONTER">

            <div className="bg-back">
                <div className="img-imgSaleIn">
                    <img className="imgSaleIn" src={it.imageCart} alt="Property" />
                    <h3>
                        {it.price} <span>{it.currency}</span>
                    </h3>
                    <div className="dis-play">
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
                    </div>
                    <h5>{it.title}</h5>
                    <h6>
                        <ationOnIcon /> {it.locationOn}
                    </h6>
                </div>
            </div>
            </div>

        </Link>
        </Grid>

    )});

    return (
        <div className="Commercial2">
     
            <div className="h-5vh"></div>

            <Slider {...settings}>{imgsetin}</Slider>
            <div className="h-5vh"></div>
        </div>
    );
}
