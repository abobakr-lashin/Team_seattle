import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import "./LatestNews.css";
import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';

export default function LatestNews() {
  const LatestNew = [
    {


      id: 1,
      title1: "ALDAR UNVEILS NEW EXCLUSIVE RESIDENTIAL COMMUNITY NESTLED WITHIN THE NATURAL SURROUNDS OF YAS PARK",
      text1: "SAMA YAS IS A LUXURY PARK LIVING EXPERIENCE, FEATURING A...",
      date1:"FEBRUARY 8,2024",
      name1:"Essam El REFAEY",
      src1: "/uploads/Finish/Finish/blog/1.png",
      title2: "NEWS EXAMPLE",
      date2:"FEBRUARY 8,2024",
      name2:"Essam El REFAEY",
      text2: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src2: "/uploads/Finish/Finish/blog/2.png",
      date3:"FEBRUARY 8,2024",
      name3:"Essam El REFAEY",
      title3: "NEWS EXAMPLE",
      text3: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src3: "/uploads/Finish/Finish/blog/BACK1.png",
      date4:"FEBRUARY 8,2024",
      name4:"Essam El REFAEY",
      title4: "NEWS EXAMPLE",
      text4: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src4: "/uploads/Finish/Finish/blog/BACK1.png",
      date5:"FEBRUARY 8,2024",
      name5:"Essam El REFAEY",
      title5: "NEWS EXAMPLE",
      text5: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src5: "/uploads/Finish/Finish/blog/BACK1.png",
      date6:"FEBRUARY 8,2024",
      name6:"Essam El REFAEY",
      title6: "NEWS EXAMPLE",
      text6: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src6: "/uploads/Finish/Finish/blog/BACK1.png",
      date7:"FEBRUARY 8,2024",
      name7:"Essam El REFAEY",
      title7: "NEWS EXAMPLE",
      text7: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src7: "/uploads/Finish/Finish/blog/BACK1.png",
      date8:"FEBRUARY 8,2024",
      name8:"Essam El REFAEY",
      title8: "NEWS EXAMPLE",
      text8: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src8: "/uploads/Finish/Finish/blog/BACK1.png",
      date9:"FEBRUARY 8,2024",
      name9:"Essam El REFAEY",
      title9: "NEWS EXAMPLE",
      text9: "THIS TEXT IS AN EXAMPLE OF TEXT THAT CAN BE...",
      src9: "/uploads/Finish/Finish/blog/BACK1.png",
    },
    {
      id: 2,
      title2: "",
      text2: "",
      src1: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src2: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src3: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src4: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src5: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src6: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src7: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src8: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
      src9: "/uploads/Finish/Finish/blog/VectorSmartObject.png",
    },
    {
      id: 3,
      title2: "",
      text2: "",
      src1: "/uploads/Finish/Finish/blog/BACK1.png",
      src2: "/uploads/Finish/Finish/blog/BACK1.png",
      src3: "/uploads/Finish/Finish/blog/BACK1.png",
      src4: "/uploads/Finish/Finish/blog/BACK1.png",
      src5: "/uploads/Finish/Finish/blog/BACK1.png",
      src6: "/uploads/Finish/Finish/blog/BACK1.png",
      src7: "/uploads/Finish/Finish/blog/BACK1.png",
      src8: "/uploads/Finish/Finish/blog/BACK1.png",
      src9: "/uploads/Finish/Finish/blog/BACK1.png",
    },
    {
      id: 4,
      title2: "",
      text2: "",
      src1: "/uploads/Finish/Finish/blog/BACK1.png",
      src2: "/uploads/Finish/Finish/blog/BACK1.png",
      src3: "/uploads/Finish/Finish/blog/BACK1.png",
      src4: "/uploads/Finish/Finish/blog/BACK1.png",
      src5: "/uploads/Finish/Finish/blog/BACK1.png",
      src6: "/uploads/Finish/Finish/blog/BACK1.png",
      src7: "/uploads/Finish/Finish/blog/BACK1.png",
      src8: "/uploads/Finish/Finish/blog/BACK1.png",
      src9: "/uploads/Finish/Finish/blog/BACK1.png",
    },
  ];

  const [idLatestNew, setIdLatestNew] = useState(1);
  const currentNews = LatestNew.find(item => item.id === idLatestNew);

  const handleNext = () => {
    setIdLatestNew(prevId => {
      const nextId = prevId + 1 > LatestNew.length ? 1 : prevId + 1;
      return nextId;
    });
  };

  const handlePrevious = () => {
    setIdLatestNew(prevId => {
      const prevIdValue = prevId - 1 < 1 ? LatestNew.length : prevId - 1;
      return prevIdValue;
    });
  };

  return (
    <div className='OurPartners'>
      <NavPar />
      <div className="h-5vh"></div>
      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/2/img/marpa.png" alt="" />
        </div>
        <div className="title-dis7">
          <div>
            Home <KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} />
          </div>
          <div>BOLGS</div>
        </div>
      </div>
      <div className="h-5vh"></div>

      <div className="h-img">
        {currentNews ? (
          <>
            <div className='flex-container'>
              {[{ src: currentNews.src1, title: currentNews.title1, text: currentNews.text1 ,name:currentNews.name1 ,date:currentNews.date1},
                { src: currentNews.src2, title: currentNews.title2, text: currentNews.text2 ,name:currentNews.name2 ,date:currentNews.date2},
                { src: currentNews.src3, title: currentNews.title3, text: currentNews.text3 ,name:currentNews.name3 ,date:currentNews.date3}].map((news, index) => (
                <div className='img-LatestNews1' key={index} style={{ backgroundImage: `url(${news.src})` }}>
                  {news.title && <div className="news-title">{news.title}</div>}
                  {news.text && <div className="news-text">{news.text}</div>}
                  {news.src && <Link to={"/blog"} className='read-More'>read More...</Link>}
                  <div className='avter'> <PersonIcon  />{news.name}</div>
                  <div className="date"><CalendarMonthIcon /> {news.date}</div>
                </div>
              ))}
            </div>
            <div className='flex-container'>
              {[{ src: currentNews.src4, title: currentNews.title4, text: currentNews.text4 ,name:currentNews.name4 ,date:currentNews.date4},
                { src: currentNews.src5, title: currentNews.title5, text: currentNews.text5 ,name:currentNews.name5 ,date:currentNews.date5},
                { src: currentNews.src6, title: currentNews.title6, text: currentNews.text6 ,name:currentNews.name6 ,date:currentNews.date6}].map((news, index) => (
                <div className='img-LatestNews1' key={index} style={{ backgroundImage: `url(${news.src})` }}>
                  {news.title && <div className="news-title">{news.title}</div>}
                  {news.text && <div className="news-text">{news.text}</div>}
                  {news.src && <button className='read-More'>read More...</button>}
                  <div className='avter'> <PersonIcon  />{news.name}</div>
                  <div className="date"><CalendarMonthIcon /> {news.date}</div>
                </div>
              ))}
            </div>
            <div className='flex-container'>
              {[{ src: currentNews.src7, title: currentNews.title7, text: currentNews.text7,name:currentNews.name7 ,date:currentNews.date7 },
                { src: currentNews.src8, title: currentNews.title8, text: currentNews.text8,name:currentNews.name8 ,date:currentNews.date8 },
                { src: currentNews.src9, title: currentNews.title9, text: currentNews.text9,name:currentNews.name9 ,date:currentNews.date9 }].map((news, index) => (
                <div className='img-LatestNews1' key={index} style={{ backgroundImage: `url(${news.src})` }}>
                  {news.title && <div className="news-title">{news.title}</div>}
                  {news.text && <div className="news-text">{news.text}</div>}
                  {news.src && <button className='read-More'>read More...</button>}
                  <div className='avter'> <PersonIcon  />{news.name}</div>
                  <div className="date"><CalendarMonthIcon /> {news.date}</div>
                </div>
              ))}
            </div>
            <div className="h-5vh"></div>
          </>
        ) : (
          <p>No news available</p>
        )}
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} className='nav-button'>
          <KeyboardDoubleArrowLeftIcon sx={{ color: "white", fontSize: "45px" }} />
        </button>
        <div style={{ fontSize: "25px", color: "#d3b76d", padding: "10px", fontWeight: "bold" }}>{idLatestNew}</div>
        <button onClick={handleNext} className='nav-button'>
          <KeyboardDoubleArrowRightIcon sx={{ color: "white", fontSize: "45px" }} />
        </button>
      </div>
      <div className="h-5vh"></div>
      <Footer />
    </div>
  );
}
