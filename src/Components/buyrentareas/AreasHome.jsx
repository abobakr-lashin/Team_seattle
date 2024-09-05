import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../commercial/Commercial.css";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "./BuyHome.css"
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

export default function BuyHome() {
  useEffect(() => {
    requestAnimationFrame(() => {
      console.log('Checking DOM changes after the page load');
      // يمكنك هنا وضع أي أكواد تحتاج إلى مراقبة تغييرات الـ DOM
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

  const ourProject = [
    { id: 1, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLAN `,Price : " Price from 410,300 AED" },
    { id: 2, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
    { id: 3, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
    { id: 4, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
    { id: 5, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
    { id: 6, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
    { id: 7, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
    { id: 8, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
    { id: 9, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
    { id: 10, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
    { id: 11, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
    { id: 12, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
    { id: 13, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
    { id: 14, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
    { id: 15, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
    { id: 16, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
    { id: 17, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
    { id: 18, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
    { id: 19, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
    { id: 20, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },

  ];

  const imgsetin = ourProject.map((img) => (
    <Grid key={img.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
        <div className="all-Abudhabi">
          <div className="img-Abudhabi">
            <div
              className="bg-imga"
              style={{ backgroundImage: `url(${img.src})` }}
            ></div>
            <h2>{img.name}</h2>
            <h3>
          {img.Price }
            </h3>
            <br />
            <br />
            <br />
            <div className="dis">
              <div>
                <div className="btn-t"><Link to={"/Landingpage"} >Buy Property</Link>  </div>
                <div className="btn-t"><Link to={"/Landingpage"}>Rent Property</Link> </div>
              </div>
            </div>
          </div>
        </div>
      </Grid>
  ));

  return (
    <div>
      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7" style={{ display: "flex" }}>
          <h2>
            <div style={{ textTransform: "uppercase", fontSize: "50px" }}>
            Popular Areas in UAE</div>
          </h2>
        </div>
      </div>
      <div className="h-5vh"></div>

      <Slider {...settings}>{imgsetin}</Slider>
      <div className="h-5vh"></div>
      <div className="h-5vh"></div>
    </div>
  );
}
