import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../commercial/Commercial.css";

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

  const imgSaleIn = [
    {
      id: 1,
      src1: "/uploads/commercial/export/photo5.png",
      money: "28,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 2,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50002151050500",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 3,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50002151050500",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
  ];

  const imgsetin = imgSaleIn.map((img) => (
    <div key={img.id} className="CONTER">
      <div className="bg-back">
        <div className="img-imgSaleIn">
          <img className="imgSaleIn" src={img.src1} alt="Property" />
          <h3>
            {img.money} <span>{img.CoinsName}</span>
          </h3>
          <div className="dis-play">
            <div>
              <span>
                <span>{img.bed}</span> <img src={img.imgbed} alt="Bed" />
              </span>
              <div>BEDS</div>
            </div>
            <div>
              <span>
                <span>{img.bath}</span> <img src={img.imgbath} alt="Bath" />
              </span>
              <div>Baths</div>
            </div>
            <div>
              <span>
                <span>{img.square}</span> <img src={img.imgsquare} alt="Square" />
              </span>
              <div>Square{`{ft}`}</div>
            </div>
          </div>
          <h5>{img.title}</h5>
          <h6>
            <LocationOnIcon /> {img.LocationOn}
          </h6>
        </div>
      </div>
    </div>
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
            Renting a Property in UAE        </div>
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
