import { Box, Grid } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from 'react-router-dom';
import NavPar from './../Components/appbar/NavPar'
import Footer from './../Components/footer/Footer.jsx'
import "./Developers.css"
import { useState } from 'react';
import OUREXPERT from './OUREXPERT';

export default function Developers() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // لتتبع مصطلح البحث
    const itemsPerPage = 9;
    const ourProject = [
        { id: 1, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLAN `,Price : " Price from 410,300 AED" },
        { id: 2, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
        { id: 3, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
        { id: 4, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
        { id: 5, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
        { id: 6, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
        { id: 7, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
        { id: 8, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
        { id: 9, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
        { id: 10, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
        { id: 11, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
        { id: 12, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
        { id: 13, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
        { id: 14, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
        { id: 15, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
        { id: 16, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
        { id: 17, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`,Price : " Price from 410,300 AED" },
        { id: 18, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price : " Emaar south" },
        { id: 19, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price : " Emaar south" },
        { id: 20, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price : " Emaar south" },
    
      ];
      const filteredProjects = ourProject.filter((project) =>
        project.name.toUpperCase().includes(searchTerm.toUpperCase())
      );
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    
      const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      };
    
      const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      };
    


      const our = currentItems.map((img) => {
        return (
          <Grid key={img.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
            <div className="all-Abudhabi">
              <div className="img-Abudhabi">
                <div
                  className="bg-imga"
                  style={{ backgroundImage: `url(${img.src})` }}
                ></div>
                <h2>{img.name}</h2>
                <h3>
              {img.Price }
                </h3>
                <div className="dis">
                  <div>
                    <div className="btn-t">Buy Property </div>
                    <div className="btn-t">Rent Property</div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        );
      });



  return (
    <div>
        <div className='OurPartners'>
      <NavPar />

      <div className="h-5vh"></div>

<div className="grop-title">
  <div className="img-dis">
    <img src="/uploads/img/marpa.png" alt="" />
  </div>
  <div className="title-dis7">
    <h1>Home <Link to={"/"}><KeyboardDoubleArrowRightIcon sx={{color:"#d3b76d",fontSize:"65px"}}/> </Link>     <div style={{textTransform:"uppercase"}}>Developers <Link to={"/Ourpartners"}><KeyboardDoubleArrowRightIcon sx={{color:"#d3b76d",fontSize:"65px"}}/> </Link> </div>   </h1>
<div>EMAAR</div>
  </div>
</div>

<Box  sx={{width:"80%",margin:"20px auto"
}}>
<div className="img-Developerss" style={{backgroundImage:`url(/uploads/developerprojects/export/photo1.png)`}}>


</div>
<h2>Our Partners</h2>
<Grid sx={{ margin: "auto", width: "100%" }} container spacing={2}>
        {our}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <div onClick={handlePreviousPage} style={{ cursor: currentPage > 1 ? 'pointer' : 'default', opacity: currentPage > 1 ? 1 : 0.5 }}>
          <img src="/uploads/commercial/export/northarrow.png" alt="Previous" />
        </div>
        <h2 style={{ margin: '0 10px' }}>{currentPage}</h2>    
        <div onClick={handleNextPage} style={{ cursor: currentPage < totalPages ? 'pointer' : 'default', opacity: currentPage < totalPages ? 1 : 0.5 }}>
          <img src="/uploads/commercial/export/rightarrow.png" alt="Next" />
        </div>
      </div>
      <OUREXPERT/>
      <h2>Built in Districts</h2>


</Box>
      <Grid sx={{  width: "100%" }}  spacing={2}>

      <Grid sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>

<img width={"40%"} style={{margin:"15px"}}  src="/uploads/developerprojects/export/photo2.png" alt="" />
<img  width={"25%"}   style={{margin:"px"}} src="/uploads/developerprojects/export/photo3.png" alt="" />
<img width={"25%"}  style={{margin:"5px"}} src="/uploads/developerprojects/export/photo5.png" alt="" />


</Grid>

</Grid>
      <Grid sx={{  width: "100%" }}  spacing={2}>

      <Grid sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>

<img width={"40%"} style={{margin:"15px"}}  src="/uploads/developerprojects/export/photo4.png" alt="" />
<img width={"25%"}  style={{margin:"5px"}} src="/uploads/developerprojects/export/photo6.png" alt="" />
<img width={"25%"}   style={{margin:"5px"}} src="/uploads/developerprojects/export/photo7.png" alt="" />














</Grid>

</Grid>

<div className="h-5vh"></div>
<Footer/>
    </div>
    </div>
  )
}
// #085364
// 107D96
// 1AAACB