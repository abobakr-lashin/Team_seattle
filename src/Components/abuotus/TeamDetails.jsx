import React from "react";
import NavPar from "./../appbar/NavPar.jsx";
import { useParams, Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import Footer from "../footer/Footer.jsx";
import "./team.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
export default function TeamDetails() {
  const imgTeam = [
    {
      id: 3,
      src: "/uploads/Finish/Finish/about us/OUR Team/New folder/PHOTO.png",
      src2: "/uploads/Finish/Finish/about us/OUR Team/s/1.png",
      src3: "/uploads/Finish/Finish/about us/OUR Team/s/2.png",
      title: "MOHAMMAD SAQR",
      title2: "GENERAL MANAGER OF GROUP SALES",
      p: "",
    },
    {
      id: 1,
      src: "/uploads/Finish/Finish/about us/OUR Team/New folder/sa.png",
      src2: "/uploads/Finish/Finish/about us/OUR Team/s/2.png",
      src3: "/uploads/Finish/Finish/about us/OUR Team/s/3.png",
      title: "ESSAM EL REFAEY",
      title2: "GROUP EXECUTIVE DIRECTOR & CEO",
      p: "A driven managing director with an insatiable hunger for success in real estate and investing. With a keen eye for lucrative opportunities and the tenacity to close the deal, his unbridled passion has propelled him to the top of his field. Though intensely focused on the bottom line, he still makes time to pass on his hard-won knowledge by mentoring aspiring entrepreneurs. His depth of expertise and unwavering determination make him a force to be reckoned with in the world of real estate and investing.",
    },
    {
      id: 2,
      src: "/uploads/Finish/Finish/about us/OUR Team/New folder/safv.png",
      src2: "/uploads/Finish/Finish/about us/OUR Team/s/1.png",
      src3: "/uploads/Finish/Finish/about us/OUR Team/s/3.png",
      title: "NADA JALAL MOHAMMED AL KHALED",
      title2: "CO-FOUNDER & DIRECTOR OF GROUP QUALITY CONTROL",
      p: "Nada Al Khaled serves as the Quality Control Director of the group. Graduating from New York University Abu Dhabi, Nada’s unwavering commitment to excellence is evident in her meticulous approach to overseeing quality control processes across the company’s diverse sectors, including Real Estate, Mortgage, Digital Media, and Travel. Through her astute inspections, audits, and assessments, she consistently identifies areas for improvement and implements robust quality control measures. Nada’s collaborative nature and dedication to customer satisfaction, regulatory compliance, and continuous enhancement have solidified Seattle and Middle East’s reputation as a paragon of quality and reliability in the industry.",
    },
  ];

  const imgTeams = [
    { id: 1, src: '/uploads/img/team/essam.png'},
    { id: 2, src: '/uploads/img/team/nada.png' },
    { id: 3, src: '/uploads/img/team/saqr.png' },
  ];

  const { Teamid } = useParams();
  const teamMember = imgTeam.find((img) => img.id === parseInt(Teamid));

  if (!teamMember) {
    return (
      <div style={{ width: "100%", fontSize: "100px", textAlign: "center", color: "white", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
    <Link to={"/"}><KeyboardDoubleArrowRightIcon sx={{color:"#d3b76d",fontSize:"65px"}}/> </Link> 
          </h2>
             <h3>MANAGEMENT TEAM</h3>
        </div>
      </div>

      <Box
      className="team-img-title"
        sx={{
   
        }}
        item
        xs={12}
        sm={6}
        md={6}
      >
        <img className="img-smal" src={teamMember.src} alt="" />
        <div className="grop-title22">
          <h2>{teamMember.title}</h2>
          <h3>{teamMember.title2}</h3>
          <p>{teamMember.p}</p>
        </div>
      </Box>

      <div className="h-5vh"></div>

      <Grid container spacing={4}>
        {imgTeams
          .filter(i => i.id !== teamMember.id)
          .map(i => (
            <Grid
              key={i.id}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{margin:"auto", display: 'flex', justifyContent: 'end', alignItems: 'start', width:"100%", height: "auto" }}
            >
              <Link className="center" to={`/TeamDetails/${i.id}`}>
                <img className="img-smal" src={i.src} alt="يسشي" />
              </Link>
            </Grid>
          ))}
      </Grid>
      <div className="h-5vh"></div>

      <Footer />
    </div>
  );
}
