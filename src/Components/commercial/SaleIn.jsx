import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules'; // Import Navigation module correctly
import 'swiper/swiper-bundle.css';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './Commercial.css';

export default function SaleIn() {
    const [data, setData] = useState([]);

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
                    nextEl: '.swiper-button-next', // الربط مع السهم الأيمن
                    prevEl: '.swiper-button-prev', // الربط مع السهم الأيسر
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
                {data.map((it) => (
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

    return (
        <div className="Commercial2">
            <div className="h-5vh"></div>
            {imgsetin}
            <div className="h-5vh"></div>
        </div>
    );
}
