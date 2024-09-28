import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./Cardsell.css"
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import "./Sell.css"
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

export default function Cardsell() {
  const [data , setData] = useState([])
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

      // Get Data from Firestore
      const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartSell"));
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

  const imgsetin = data.map((it) => (
    <div key={it.id} className="CONTER">
      <div className="bg-back">
        <Link to={`/Sell/${it.id}`} className="img-imgSaleIn">
          <img className="imgSaleIn" src={it.imageCart} alt="Property" />
          <h3>
            {it.money} <span>{it.CoinsName}</span>
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
                <span>{it.baths}</span> <img src={"/uploads/commercial/export/icon/bath.png"} alt="Bath" />
              </span>
              <div>Baths</div>
            </div>
            <div>
              <span>
                <span>{it.square}</span> <img src={"/uploads/commercial/export/icon/square.png"} alt="Square" />
              </span>
              <div>Square{`{ft}`}</div>
            </div>
          </div>
          <h5>{it.title}</h5>
          <h6>
            <LocationOnIcon /> {it.LocationOn}
          </h6>
        </Link>
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
