import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../commercial/Commercial.css";
import "./BuyHome.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

// استيراد Swiper و SwiperSlide بشكل صحيح من 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-prev-arrow`} onClick={onClick}>
      <span></span>
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-next-arrow`} onClick={onClick}>
      <span></span>
    </div>
  );
};

export default function RentHome() {
  const [Data, setData] = React.useState([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      console.log('Checking DOM changes after the page load');
    });
  }, []);

  const settings = {
    centerMode: false,
    centerPadding: "auto",
    slidesToShow: 3,
    focusOnSelect: false,
    infinite: true,
    speed: 600,
    autoplay: false,
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
      const querySnapshot = await getDocs(collection(firestore, "listBlogsCartRent"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  // إعداد Swiper
  const imgsetin = (
    <div className="swiper-container">
      <div className="swiper-button-prev custom-arrow"></div>
      <div className="swiper-button-next custom-arrow"></div>

      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1025: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {Data.map((it) => (
          <SwiperSlide key={it.id}>
            <Grid sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
              <Link to={`/Commercial/${it.category}/${it.id}`}>
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
                        <LocationOnIcon /> {it.location}
                      </h6>
                    </div>
                  </div>
                </div>
              </Link>
            </Grid>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  useEffect(() => {
    GetDataFireStore();
  }, []);

  return (
    <div>
      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7" style={{ display: "flex" }}>
          <h2>
            <div style={{ textTransform: "uppercase", }}>
              Renting a Property in UAE
            </div>
          </h2>
        </div>
      </div>
      <div className="h-5vh"></div>
      {imgsetin}
      <div className="h-5vh"></div>
      <div className="h-5vh"></div>
    </div>
  );
}
