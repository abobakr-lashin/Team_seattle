import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../commercial/Commercial.css";
import "./BuyHome.css"
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';// Import Navigation module correctly
import 'swiper/swiper-bundle.css';


export default function BuyHome() {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        requestAnimationFrame(() => {
            console.log('Checking DOM changes after the page load');
        });
    }, []);

    // Get Data from Fire store
    const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartBuy"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };


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
                {data.map((it) => (
                    <SwiperSlide key={it.id}>
                        <Grid key={it.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item lg={4} md={6} sm={6}>
                            <Link to={`/buy/${it.id}`}>
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
                                                    <div>Square ft</div>
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
    }, [GetDataFireStore]);

    return (
        <div>
            <div className="grop-title">
                <div className="img-dis">
                    <img src="/uploads/img/marpa.png" alt="" />
                </div>
                <div className="title-dis7" style={{ display: "flex" }}>
                    <h2>
                        <div style={{ textTransform: "uppercase", }}>
                            Buying Property in UAE            </div>
                    </h2>
                </div>
            </div>
            <div className="h-5vh"></div>
            {/* Cart */}
            {imgsetin}
            <div className="h-5vh"></div>
            <div className="h-5vh"></div>
            <div className="h-5vh"></div>

        </div>
    );
}
