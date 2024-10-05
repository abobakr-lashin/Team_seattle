import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CustomSlider.css';
import './OurProjects.css';
import { Link } from 'react-router-dom';

export default function OurProjects() {
  const settings = {
    centerMode: true,
    centerPadding: '1',
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: true,
    speed: 600,
    // autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
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
    { id: 1, src:"/uploads/rent/export/photo1.png"},
    { id: 2, src:"/uploads/rent/export/photo1.png"},
    { id: 3, src:"/uploads/rent/export/photo1.png"},
    { id: 4, src:"/uploads/rent/export/photo1.png"},
    { id: 5, src:"/uploads/rent/export/photo1.png"},
    { id: 6, src:"/uploads/rent/export/photo1.png"},
    { id: 7, src:"/uploads/rent/export/photo1.png"},
    { id: 8, src:"/uploads/rent/export/photo1.png"},
    { id: 9, src:"/uploads/rent/export/photo1.png"},
  ];
  const imgsetin = imgOurProjects.map((img) => {
    return(
    <div key={img.id} className="slide-item">
      <div className="bg-back">

      <div className="project-img" style={{ backgroundImage: `url(${img.src})` }}> </div>
  
      <div className="City">ANSAM</div>
      <div className="type" >

      TYPE: Studio - 3 Bed Apartments <br />
SIZES: 51 - 193 SQM <br />
PAYMENT PLAN: 3 Years <br />
HANDOVER: Ready to move in <br />
STARTING PRICES: Sold out <br />
      </div>
      <div className="btn-re">
    <Link  to={`/Abudhabi`}  >
        <button className="btn-register1">More Projects</button> 
        </Link>
      </div>
       
        <div className="display-f">
          <Link to="https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0" target="_blank"  className="btn-whatsapp"> </Link>
          <Link  to="tel:+971502135701" className="btn-call"></Link>
        </div>
     
      </div>
    </div>)
});

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
        <Slider {...settings}>{imgsetin}</Slider>
        
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
