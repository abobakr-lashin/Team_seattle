import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Commercial.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FormN from "../appbar/FormN";
import Footer from "../footer/Footer";

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-prev-arrow`}
      onClick={onClick}
    >
      {/* يمكنك استخدام أي محتوى تريده هنا مثل نص أو عنصر SVG */}
      <span></span> {/* استخدام رمز "أقل من" كرمز سهم */}
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
  const settings = {
    centerMode: false,
    centerPadding: "auto",
    slidesToShow: 3,
    focusOnSelect: false,
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
    // ... Add more items as needed
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
      <Slider {...settings}>{imgsetin}</Slider>
      <div className="h-5vh"></div>
     
  
    </div>
  );
}
