import React from 'react';
import './Testimonials.css';
import Slider from 'react-slick';

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '-50px', zIndex: 1 }}
      onClick={onClick}
    >
    </div>
  );
}

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '-50px', zIndex: 1 }}
      onClick={onClick}
    >
    </div>
  );
}

export default function Testimonials() {
  const imgTestimonials = [
    { id: 1, src: './uploads/img/testimonials/1.png' },
    { id: 2, src: './uploads/img/testimonials/2.png' },
    { id: 3, src: './uploads/img/testimonials/3.png' },
    { id: 4, src: './uploads/img/testimonials/4.png' },
    { id: 5, src: './uploads/img/testimonials/5.png' },
  ];

  const settings = {
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3, // الافتراضي هو عرض 3 شرائح على الشاشات الأكبر
    focusOnSelect: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => {
      document.querySelectorAll('.slick-slide').forEach((slide) => {
        slide.style.opacity = '.5';
      });
      document.querySelectorAll('.slick-center').forEach((slide) => {
        slide.style.opacity = '1';
      });
    },
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // عرض شريحتين فقط على الشاشات التي يقل عرضها عن 1024 بكسل
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // عرض شريحة واحدة فقط على الشاشات التي يقل عرضها عن 600 بكسل
          centerMode: false, // لتعطيل وضع المركز في الهواتف
        },
      },
    ],
  };
  

  return (
    <>
      <div className='Testimonials'>
        <div className="grop-title4">
          <div className="img-dis3">
            <img src="/uploads/img/marpa.png" alt="مريع" />
          </div>
          <div className="title-dis2">
            <h2>CLIENT'S TESTIMONIALS</h2>
            <h3>WE BUILD TRUST, WE OFFER PROFESSIONALISM</h3>
          </div>
        </div>
        <div className="h-5vh"></div>
        <div className="h-5vh"></div>
        <div className="bg-body1">
          <div className="photo-phone">
            <Slider {...settings}>
              {imgTestimonials.map((imgt) => (
                <div key={imgt.id}>
                  <img className='img-Esteemed1' src={imgt.src} alt="سي" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
