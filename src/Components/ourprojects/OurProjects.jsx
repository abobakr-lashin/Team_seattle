import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CustomSlider.css';
import './OurProjects.css';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css';



export default function OurProjects() {
    const [data, setData] = useState([])
    const Navigate = useNavigate()

    // Get Data Cart Firebase
    const getCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartBuy"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const FilterData = docs.filter((it) => it.plan === 'Off-plan')
            setData(FilterData);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);




    return (
        <div  >
            <div className="btn-whats"></div>
            <div className="grop-title1">
                <div className="img-dis">
                    <img src="/uploads/img/marpa.png" alt="مريع" />
                </div>
                <div className="title-dis3">
                    <h2>OUR PROJECTS</h2>
                    <h3>SEATTLE & MIDDLE EAST GROUP</h3>
                </div>
            </div>
            <div className="h-5vh"></div>
            <div className="slider-container">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={0}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next1',
                        prevEl: '.swiper-button-prev1',
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
                            <div key={it.id} className="slide-item">
                                <div className="bg-back1">
                                    <div className="project-img"> 
                                        <img src={it.imageCart} alt="" />
                                    </div>
                                    <div className="City">{it.title}</div>
                                    <div className="type" >
                                        TYPE: {it.type} <br />
                                        SIZES: {it.size}<br />
                                        PAYMENT PLAN: {it.payment} <br />
                                        HANDOVER: {it.handover} <br />
                                        STARTING PRICES: {it.starting} <br />
                                    </div>
                                    <div className="btn-re">
                                        <button onClick={() => {
                                            Navigate(`/Seattle/${it.id}`)
                                        }} className="btn-register1">Show Projects</button>
                                    </div>
                                    <div className="display-f">
                                        <Link to="https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0" target="_blank" className="btn-whatsapp"> </Link>
                                        <Link to="tel:+971502135701" className="btn-call"></Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '25px',
                }}
            >

            </div>
        </div>
    );
}
