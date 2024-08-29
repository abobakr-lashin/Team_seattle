import React, { useState } from 'react';
import { Link } from "react-router-dom";
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Grid } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from '@mui/icons-material/Search';
import FormN from '../appbar/FormN';
import Footer from '../footer/Footer';
import OUREXPERT from '../../Pages/OUREXPERT';

import "./buy.css";
export default function Buy() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [price, setPrice] = useState('');
  const [completionStatus, setCompletionStatus] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minArea, setMinArea] = useState('');
  const [maxArea, setMaxArea] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [maxBedrooms, setMaxBedrooms] = useState('');
  const [minPrice, setMinPrice] = useState('');

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
        LocationOn: "zayed, Al Wasl",
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

  // تصفية المشاريع بناءً على مصطلحات البحث
  const filteredProjects = imgSaleIn.filter((project) => {
    return (
      (!searchTerm || project.title.toUpperCase().includes(searchTerm.toUpperCase())) &&
      (!price || parseFloat(project.money.replace(/,/g, '')) >= parseFloat(price)) &&
      (!location || project.LocationOn.toUpperCase().includes(location.toUpperCase())) &&
      (!minBedrooms || project.bed >= parseInt(minBedrooms)) &&
      (!maxBedrooms || project.bed <= parseInt(maxBedrooms)) &&
      (!minPrice || parseFloat(project.money.replace(/,/g, '')) >= parseFloat(minPrice)) &&
      (!minArea || project.square >= parseFloat(minArea)) &&
      (!maxArea || project.square <= parseFloat(maxArea))
    );
  });

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

  const handleSearch = () => {
    setCurrentPage(1); // إعادة ضبط الصفحة الحالية عند البحث
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
    <div className="buy">
      <div className="img-buy">
        <NavPar />
        <div className="h-5vh"></div>

        <div className="grop-title">
          <div className="img-dis">
            <img src="/uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis7" style={{ display: "flex" }}>
            <h2>
              Home{" "}
              <Link to={"/"}>
                {" "}
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "#d3b76d", fontSize: "65px" }}
                />
              </Link>
              <div style={{ textTransform: "uppercase" }}>buy</div>
            </h2>
          </div>
        </div>
        <h1>LUXURY PROPERTIES FOR SALE IN UAE</h1>
        <div className="hr">
          <div className="form-buy">
            <input
              type="number"
              className="input-style-1"
              placeholder="Buy"
              min={10000}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              className="input-style-2"
              placeholder="Completion Status"
              value={completionStatus}
              onChange={(e) => setCompletionStatus(e.target.value)}
            />
            <input
              type="text"
              className="input-style-3"
              placeholder="Location, Community, City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
                        <input
              type="submit"
              className="input-style-submit"
              value="FIND"
              onClick={handleSearch}
            />
            <input
              type="text"
              className="input-style-4"
              placeholder="Select Property Type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <input
              type="text"
              className="input-style-5"
              placeholder="Min. Area"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
            <input
              type="text"
              className="input-style-6"
              placeholder="Max. Area"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
            />
            <input
              type="text"
              className="input-style-7"
              placeholder="Min. Bedrooms"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
            />
            <input
              type="text"
              className="input-style-8"
              placeholder="Max. Bedrooms"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
            />
            <input
              type="text"
              className="input-style-9"
              placeholder="Min. Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

          </div>
        </div>
      </div>

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


      
      <OUREXPERT/>

<Footer/>
    </div>
  );
}
