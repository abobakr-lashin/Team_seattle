import React from 'react'
import { Link } from 'react-router-dom'
import Footer from "./../footer/Footer.jsx"
import NavPar from "./../appbar/NavPar"
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import "./About.css"
import OUREXPERT from '../../Pages/OUREXPERT.jsx';

export default function About() {
  return (
    <div  className="Abouts">
        <NavPar />
      <div className="About">

        <div className="h-5vh"></div>

        <div className="grop-title">
          <div className="img-dis">
            <img src="/uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis6">
            <h2>Home 
              <Link to={"/"}>
                <KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} />
              </Link>
            </h2>
            <h3>MEET THE TEAM</h3>
          </div>
        </div>

        <div className="about-us-container">

          <section className="about-us">
            <h1>Who Are We?</h1>
            <p>
              Founded in 2021, Seattle & Middle East stands as a premier real estate firm headquartered in Abu Dhabi, 
              distinguished by our commitment to providing exemplary property solutions across the UAE, GCC, and select international markets. 
              We offer a comprehensive array of services encompassing residential, commercial, and industrial real estate, 
              meticulously tailored to meet the varied needs of our clientele.
            </p>
            <p>
              Our firm is dedicated to upholding the highest standards of professionalism and transparency, 
              ensuring that each transaction is executed with the utmost integrity and diligence.
            </p>
          </section>

            <div className="imgour">
          <section className="why-choose-us">
            <h2>Why Choose Us?</h2>
            <p>
              Seattle & Middle East provides exceptional real estate services across the UAE, GCC, and international markets. 
              Our dedication to professionalism, transparency, and thorough market knowledge ensures tailored solutions that meet your unique needs. 
              With our extensive network and commitment to excellence, we deliver outstanding results and build lasting, trust-based partnerships.
            </p>
          </section>

          <section className="our-values">
            <h2>Our Values</h2>
              <ul>
                <li><strong>Integrity:</strong> We conduct all transactions with the highest ethical standards, ensuring transparency and honesty in every interaction.</li>
                <li><strong>Excellence:</strong> We are committed to delivering superior service and results through meticulous attention to detail and industry expertise.</li>
                <li><strong>Client-Centricity:</strong> We prioritize our clients' needs, tailoring our solutions to meet their evolving requirements and fostering long-term relationships.</li>
                <li><strong>Innovation:</strong> We embrace modern approaches and technologies, staying agile and ready to adapt in the dynamic real estate market.</li>
                <li><strong>Accountability:</strong> We take full responsibility for the outcomes of our actions, ensuring reliability and trustworthiness in all our dealings.</li>
              </ul>
          </section>

        </div>
      </div>
            </div>

      <OUREXPERT/>

<div className="h-5vh"></div>
<Footer/>




    <div>
      
    </div>
    </div>
  )
}
