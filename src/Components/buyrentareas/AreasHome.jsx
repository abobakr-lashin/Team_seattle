import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../commercial/Commercial.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import "./BuyHome.css";



export default function AreasHome() {
  const [Data, setData] = React.useState([]);

  useEffect(() => {
    requestAnimationFrame(() => {
      console.log('Checking DOM changes after the page load');
    });
  }, []);


  // Get Data from Firestore
  const GetDataFireStore = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "listBlogsCartAreas"));
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
      <div className="swiper-button-prev1 custom-arrow1"></div>
      <div className="swiper-button-next1 custom-arrow1"></div>

      <Swiper
                slidesPerView={3}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    nextEl: '.swiper-button-next1', // الربط مع السهم الأيمن
                    prevEl: '.swiper-button-prev1', // الربط مع السهم الأيسر
                }}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1, // لشاشات الهواتف الصغيرة
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 1, // لشاشات الهواتف الأكبر قليلًا
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
                modules={[Pagination, Navigation]} // التأكد من تضمين موديول Navigation
                className="mySwiper"
            >
        {Data.map((it) => (
          <SwiperSlide key={it.id}>
            <Grid key={it.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
              <div className="all-Abudhabi">
                <div className="img-Abudhabi">
                  <div
                    className="bg-imga"
                    style={{ backgroundImage: `url(${it.imageCart})` }}
                  ></div>
                  <h2>{it.CateBuyLocation.location}</h2>
                  <h3>
                    {it.CateBuyLocation.center}
                  </h3>
                  <div className="dis">
                    <div>
                      <div className="btn-t">
                        <Link to={`/Areas/Buy/category/Location/${it.CateBuyLocation.center}`}>Buy Property</Link>
                      </div>
                      <div className="btn-t">
                        <Link to={`/Areas/Rent/category/Location/${it.CateBuyLocation.center}`}>Rent Property</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      <div className="h-5vh"></div>
    </div>
  );
}
