import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavPar from "../appbar/NavPar";
import { Link, useParams } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormContainer from "../appbar/FormContainer";
import Slider from "react-slick";
import { Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./landingpage.css";
import CareersForm from "../contactus/CareersForm";
import ContactusForm from "../contactus/ContactusForm";
import Footer from "../footer/Footer";
import { firestore } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Landingpage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams()

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

  const imgOurProjects = [
    { id: 1, src: "/uploads/landingpage/export/photo2.png" },
    { id: 1, src: "/uploads/landingpage/export/photo3.png" },
    { id: 1, src: "/uploads/landingpage/export/photo2.png" },
    { id: 1, src: "/uploads/landingpage/export/photo3.png" },
  ];

  // // const imgSaleIn = [
  // //   {
  // //     id: 1,
  // //     money: "28,000,000",
  // //     CoinsName: "AED",
  // //     bed: 3,
  // //     bath: 4,
  // //     square: 4.067,
  // //     imgbed: "/uploads/commercial/export/icon/bed.png",
  // //     imgbath: "/uploads/commercial/export/icon/bath.png",
  // //     imgsquare: "/uploads/commercial/export/icon/square.png",
  // //     title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
  // //     LocationOn: "One Canal, Al Wasl",
  // //     Parking: "Parking ",
  // //     Parkingn: 4,
  // //   },

  //   // ... Add more items as needed
  // ];

  // get Data Base FireBase

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading when fetching data
      try {
        const docRef = doc(firestore, 'listingsBlogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchData();
  }, [id]);

  console.log(data);

  const imgsetin = data?.imageSlider?.map((img) => {
    return (
      <div className="slide-item">
        <div
          className="Landingpage-img"
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      </div>
    );
  });


  return (
    <div className="Landingpage">
      <div
        className="bg-Landingpage"
        style={{
          backgroundImage: `url(${data.imageCart})`,
        }}
      // style={{
      //   backgroundImage: `url(/uploads/landingpage/export/photo1.png)`,
      // }}
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
                {data.title}
              </div>
            </h2>
          </div>
        </div>
        <div className="contbg">
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
      <Grid container spacing={2} sx={{ margin: "auto", width: "90%" }}>
        <Grid item xs={8}>
          <div className="Sitedetails">
            <div className="address">
              {data.location}
            </div>
            <div className="theprice">{data.price} {data.currency}</div>
            <div className="theprices">{data.monthlyPayment} AED (per month)</div>
            <div className="hr3"></div>

            <div>
              <div className="dis-play1">
                <div>
                  <span>
                    <span>{data.beds}</span> <img src={'/uploads/commercial/export/icon/bed.png'} alt="Bed" />
                  </span>
                  <div>BEDS</div>
                </div>
                <div>
                  <span>
                    <span>{data.baths}</span> <img src={'/uploads/commercial/export/icon/bath.png'} alt="Bath" />
                  </span>
                  <div>Baths</div>
                </div>
                <div>
                  <span>
                    <span>{data.square}</span> <img src={'/uploads/commercial/export/icon/square.png'} alt="Square" />
                  </span>
                  <div>Square{`{ft}`}</div>
                </div>
                <div>
                  <span>
                    <span>{data.Parkingn}</span>
                  </span>
                  <div>Parking </div>
                </div>
              </div>
            </div>
            <div className="hr3"></div>
            <p>
              Looking for a luxurious contemporary villa that comes with a
              private pool and landscaped garden? Do you want to live in a gated
              community in a prime location? These plush homes are the perfect
              setting to start a family or raise children. Genuine and
              discerning property investors will enjoy the experience of living
              in luxury. The brilliant architecture exudes an undeniably
              appealing atmosphere.
            </p>

            <div className="PropertyDetails">
              <h1>Property details</h1>
              <ul>
                <li>5 Bedrooms with ensuite bath</li>
                <li>6 Bathrooms</li>
                <li>Area: 9,094 square feet</li>
                <li>Unfurnished</li>
                <li>Luxury finishing </li>
                <li>Landscaped garden </li>
                <li>Private pool </li>
                <li>Contemporary style </li>
                <li>Vacant & ready to move in </li>
              </ul>
            </div>

            <div className="PropertyDetails">
              At Mohammed Bin Rashid Al Maktoum City – District One, our
              priority is providing families and residents a luxurious
              lifestyle, and this is why the community being developed is set to
              meet their needs. Metropolitan Premium Properties (MPP) is
              dedicated to delivering our clients a wide array of services:
              sale, rentals, property management, consulting services, mortgage
              brokerage, and many more.
              <br />
              Let me know if you need anything else!
            </div>
          </div>

          <div className="PropertyDetails">
            <h1>Project Details:</h1>
            <div className="dis-play1">
              <div></div>
            </div>
            <div className="dis-play2">
              <div>
                <li>Unit Reference: MP-R-5896</li>
                <li>Purpose: For Rent</li>
                <li>Emirate: Dubai</li>
              </div>
              <div>
                <li>Property Name: District One Villas</li>
                <li>Parking: 4 spaces</li>
                <li>Added On: 28 July 2024</li>
              </div>
            </div>
            <ul></ul>
          </div>
          <div className="PropertyDetails1">
            <h1> Features and Amenities:</h1>
            <div className="dis-play2">
              <ul>
                <div className="m-3">Indoor</div>
                <li>Balcony</li>
                <li>Built-in wardrobes</li>
                <li>Central A/C</li>
                <li>Central heating</li>
              </ul>
              <ul>
                <div className="m-3">Outdoor</div>
                <li>Maid's room</li>
                <li>Private garden</li>
                <li>Private swimming pool</li>
                <li>Mosque</li>
                <li>Restaurants</li>
              </ul>
              <ul>
                <div className="m-3">Lot</div>
                <li>Public transport</li>
                <li>Private garden</li>
                <li>Shopping mall</li>
                <li>Mosque</li>
                <li>Shops</li>
              </ul>
            </div>
            <h1> Explore the Area: </h1>
            <h4>
              {" "}
              <LocationOnIcon /> Location: Mohammed Bin Rashid City{" "}
            </h4>
          </div>
        </Grid>

        <Grid item xs={4} alignItems={"center"} justifyContent={"center"}>
          <div className="ContactAgent">
            <div className="title">Contact Agent</div>

            <div className="imgctext">
              <div className="imgcontact">
                <img src={data.bgImage} alt={data.title} />
              </div>
              <div className="text">
                <div className=" Listing">Listing by</div>
                <div className="name">Ramin Sadeghi</div>
                <div className="contact ">
                  {/* {data?.stars?.map((star) => {
                    return (
                      <img
                        width={"20px"}
                        style={{ margin: "2px" }}
                        src="/uploads/landingpage/export/icon/star.png"
                        alt="star"
                      />
                    )
                  })} */}
                  {Array.from({ length: data?.stars || 0 }, (_, index) => {
                    return (
                      <img
                        key={index}
                        width={"20px"}
                        style={{ margin: "2px" }}
                        src="/uploads/landingpage/export/icon/star.png"
                        alt="star"
                      />
                    );
                  })}
                  <img
                    width={"20px"}
                    style={{ margin: "2px" }}
                    src="/uploads/landingpage/export/icon/star.png"
                    alt="star"
                  />
                </div>
              </div>
            </div>
            <div className="Email">Email</div>
          </div>
          <div className="formc">
            <FormContainer color={"#06404d"} />
          </div>
        </Grid>
      </Grid>
      <div className="map">
        <div className="h-5vh"></div>

        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.030497225176!2d55.27188211512686!3d25.204849983898158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434c9fd1efdd%3A0x8f24d8b87b2e6f5a!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1633599783645!5m2!1sen!2sae"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="h-5vh"></div>

        <ContactusForm />
      </div>
      <div className="h-5vh"></div>
      <Footer />
    </div>
  );
}
