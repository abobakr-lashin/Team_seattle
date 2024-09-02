import React from "react";
import NavPar from "./../appbar/NavPar.jsx";
import { useParams, Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Footer from "../footer/Footer.jsx";
import "./team.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import OUREXPERT from "../../Pages/OUREXPERT.jsx";
export default function TeamDetails() {
  const imgTeam = [
    {
      id: 3,
      src: "/uploads/Newfolder/PHOTO.png",
      src2: "/uploads/s/1.png",
      src3: "/uploads/s/2.png",
      title: "MOHAMMAD SAQR",
      title2: "GENERAL MANAGER OF GROUP SALES",
      p: "Mr. Mohamed Saqr is the General Manager of Seattle Middle East, based in Abu Dhabi, United Arab Emirates. He is an alumnus of Alexandria University. Mr. Saqr has over 17 years of experience in the banking, retail, and sales sectors, having held positions such as Relationship Manager, Sales Manager, regional head and Area Sales Manager. He possesses strong skills in retail banking, team management, business planning, cross-selling, loans, and other banking services.",
    },
    {
      id: 1,
      src: "/uploads/Newfolder/sa.png",
      src2: "/uploads/s/2.png",
      src3: "/uploads/s/3.png",
      title: "ESSAM EL REFAEY",
      title2: "GROUP EXECUTIVE DIRECTOR & CEO",
      p: `
With an illustrious 26-year career in banking & mortgage, Essam El Refaey stands at the forefront of real estate and investment excellence as the Group Executive Director & CEO. His unparalleled expertise and strategic vision have consistently driven the success of our organization, navigating complex markets and identifying high-value opportunities with precision.

Essam’s exceptional leadership and relentless pursuit of excellence have established him as a formidable presence in the industry. His ability to secure and close high-impact deals underscores his profound understanding of market dynamics and financial intricacies.

His profound commitment to success, combined with his deep industry knowledge, makes Essam El Refaey a transformative force in real estate and investment, continually advancing the growth and innovation of our group.      
      `,
    },
    {
      id: 2,
      src: "/uploads/Newfolder/safv.png",
      src2: "/uploads/s/1.png",
      src3: "/uploads/s/3.png",
      title: "NADA JALAL MOHAMMED AL KHALED",
      title2: "CO-FOUNDER & DIRECTOR OF GROUP QUALITY CONTROL",
      p: "Nada Al Khaled serves as the Quality Control Director of the group. Graduating from New York University Abu Dhabi, Nada’s unwavering commitment to excellence is evident in her meticulous approach to overseeing quality control processes across the company’s diverse sectors, including Real Estate, Mortgage, Digital Media, and Travel. Through her astute inspections, audits, and assessments, she consistently identifies areas for improvement and implements robust quality control measures. Nada’s collaborative nature and dedication to customer satisfaction, regulatory compliance, and continuous enhancement have solidified Seattle and Middle East’s reputation as a paragon of quality and reliability in the industry.",
    },
  ];

  const imgTeams = [
    { id: 1, src: "/uploads/img/team/essam.png" },
    { id: 2, src: "/uploads/img/team/nada.png" },
    { id: 3, src: "/uploads/img/team/saqr.png" },
  ];

  const { Teamid } = useParams();
  const teamMember = imgTeam.find((img) => img.id === parseInt(Teamid));

  if (!teamMember) {
    return (
      <div
        style={{
          width: "100%",
          fontSize: "100px",
          textAlign: "center",
          color: "white",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Team member not found
      </div>
    );
  }

  return (
    <div className="OurPartners">
      <NavPar />
      <div className="h-5vh"></div>
      <div className="grop-title">
        <div className="img-dis">
          <img src="/uploads/img/marpa.png" alt="" />
        </div>
        <div className="title-dis6" style={{ display: "flex" }}>
          <h2>
            Home{" "}
            <Link to={"/"}>
              <KeyboardDoubleArrowRightIcon
                sx={{ color: "#d3b76d", fontSize: "65px" }}
              />{" "}
            </Link>
          </h2>
          <h3>MANAGEMENT TEAM</h3>
        </div>
      </div>

      <Box className="team-img-title" sx={{}} item xs={12} sm={6} md={6}>
        <img width={"90%"} className="img-smal" src={teamMember.src} alt="" />
        <div className="grop-title22">
          <h2>{teamMember.title}</h2>
          <h3>{teamMember.title2}</h3>
          <p>{teamMember.p}</p>
        </div>
      </Box>

      <div className="h-5vh"></div>

      <Grid container spacing={4}>
        {imgTeams
          .filter((i) => i.id !== teamMember.id)
          .map((i) => (
            <Grid
              key={i.id}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "end",
                alignItems: "start",
                width: "100%",
                height: "auto",
              }}
            >
              <Link className="center" to={`/TeamDetails/${i.id}`}>
                <img className="img-smal" src={i.src} alt="يسشي" />
              </Link>
            </Grid>
          ))}
      </Grid>
      <div className="h-5vh"></div>
      <OUREXPERT/>

      <Footer />
    </div>
  );
}
