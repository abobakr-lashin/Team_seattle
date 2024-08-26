import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Esteemed.css';

export default function Esteemed() {
  const imgEsteemed = [
    { id: 1, src: "./uploads/img/esteemed/1.png" },
    { id: 2, src: "./uploads/img/esteemed/2.png" },
    { id: 3, src: "./uploads/img/esteemed/3.png" },
    { id: 4, src: "./uploads/img/esteemed/4.png" },
    { id: 5, src: "./uploads/img/esteemed/5.png" },
    { id: 6, src: "./uploads/img/esteemed/6.png" },
    { id: 7, src: "./uploads/img/esteemed/7.png" },
    { id: 8, src: "./uploads/img/esteemed/8.png" },
    { id: 9, src: "./uploads/img/esteemed/9.png" },
    { id: 10, src: "./uploads/img/esteemed/10.png" },
    { id: 11, src: "./uploads/img/esteemed/11.png" },
    { id: 12, src: "./uploads/img/esteemed/12.png" },
    { id: 13, src: "./uploads/img/esteemed/13.png" },
    { id: 14, src: "./uploads/img/esteemed/14.png" },
    { id: 15, src: "./uploads/img/esteemed/15.png" },
    { id: 16, src: "./uploads/img/esteemed/16.png" },
    { id: 17, src: "./uploads/img/esteemed/17.png" },
    { id: 18, src: "./uploads/img/esteemed/18.png" },
    { id: 19, src: "./uploads/img/esteemed/19.png" },
    { id: 20, src: "./uploads/img/esteemed/20.png" },
    { id: 21, src: "./uploads/img/esteemed/21.png" },
    { id: 22, src: "./uploads/img/esteemed/22.png" },
    { id: 23, src: "./uploads/img/esteemed/23.png" },
    { id: 24, src: "./uploads/img/esteemed/24.png" },
    { id: 25, src: "./uploads/img/esteemed/25.png" },
    { id: 26, src: "./uploads/img/esteemed/26.png" },
    { id: 27, src: "./uploads/img/esteemed/27.png" },
    { id: 28, src: "./uploads/img/esteemed/28.png" },
    { id: 29, src: "./uploads/img/esteemed/29.png" },
    { id: 30, src: "./uploads/img/esteemed/30.png" },
    { id: 31, src: "./uploads/img/esteemed/31.png" },
  ];

  const settings = {
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 6,
    focusOnSelect: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => {
      document.querySelectorAll('.slick-slide').forEach((slide) => {
        slide.style.opacity = '0.5';
      });
      document.querySelectorAll('.slick-center').forEach((slide) => {
        slide.style.opacity = '1';
      });
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:4,
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
 const img=  imgEsteemed.map((img) => (
    <div  key={img.id}>
      <img className='img-Esteemed' src={img.src} alt="" />
    </div>
  ))
  return (
    <div className='Esteemed'>
      <div className="grop-title3">
        <div className="img-dis2">
          <img src="./uploads/img/marpa.png" alt="مريع" />
        </div>
        <div className="title-dis2">
          <h2>Our Esteemed Partners</h2>
          <h3>We take pride in our collaborations and successes with these distinguished entities:</h3>
        </div>
      </div>
      <div className='h-5vh'></div>
      <div className="slider-container">
        <Slider className='center'  {...settings}>
        {img}
        </Slider>
        <div className='h-5vh'></div>
      </div>
    </div>
  );
}
