import React, { useState } from 'react';
import { Grid } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from '@mui/icons-material/Search';
import "../commercial/Commercial.css";

export default function Buycards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // لتتبع مصطلح البحث
  const itemsPerPage = 9;

  const imgSaleIn = [
    {
      id: 1,
      src1: "/uploads/commercial/export/photo5.png",
      money: "28,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 2,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 3,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 4,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 5,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 6,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 7,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 8,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 9,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 10,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    {
      id: 11,
      src1: "/uploads/commercial/export/photo5.png",
      money: "50,000,000",
      CoinsName: "AED",
      bed: 3,
      bath: 4,
      square: 4.067,
      imgbed: "/uploads/commercial/export/icon/bed.png",
      imgbath: "/uploads/commercial/export/icon/bath.png",
      imgsquare: "/uploads/commercial/export/icon/square.png",
      title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
      LocationOn: "One Canal, Al Wasl",
    },
    // ... Add more items as needed
  ];

  // تصفية المشاريع بناءً على مصطلح البحث
  const filteredProjects = imgSaleIn.filter((project) =>
    project.title.toUpperCase().includes(searchTerm.toUpperCase())
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

  const imgsetin = currentItems.map((img) => (
    <Grid key={img.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>

    <div className="CONTER">
      <div className="bg-back">
        <div className="img-imgSaleIn">
          <img className="imgSaleIn" src={img.src1} alt="Property" />
          <h3>
            {img.money} <span>{img.CoinsName}</span>
          </h3>
          <div className="dis-play">
            <div>
              <span>
                <span>{img.bed}</span> <img src={img.imgbed} alt="Bed" />
              </span>
              <div>BEDS</div>
            </div>
            <div>
              <span>
                <span>{img.bath}</span> <img src={img.imgbath} alt="Bath" />
              </span>
              <div>Baths</div>
            </div>
            <div>
              <span>
                <span>{img.square}</span> <img src={img.imgsquare} alt="Square" />
              </span>
              <div>Square ft</div>
            </div>
          </div>
          <h5>{img.title}</h5>
          <h6>
            <LocationOnIcon /> {img.LocationOn}
          <hr />

          <div className="Listing-by">
            <div className="img-lisby">       
                 <img  src={img.src1} alt="Property" />
            </div>
            <div className="title-lisby">Listing by Ramin Sadeghi </div>
            
            </div> 
          </h6>
        </div>
      </div>
    </div>
    </Grid>
  ));

  return (







    <div className='buy'>


      <Grid sx={{ margin: "auto", width: "100%" }} container spacing={2}>
        {imgsetin}
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
    </div>
  );
}
