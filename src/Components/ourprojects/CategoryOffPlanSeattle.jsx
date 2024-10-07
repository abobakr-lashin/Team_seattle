import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Grid } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from '@mui/icons-material/Search';
import FormN from '../appbar/FormN';
import Footer from '../footer/Footer';
import OUREXPERT from '../../Pages/OUREXPERT';

import "../buy/buy.css";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
export default function CategoryOffPlanSeattle() {
    const { id } = useParams()
    const [data, setData] = useState([]);
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
    const Navigate = useNavigate()


    // Get Data from Firestore
    const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartSEATTLE"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const filterdata = docs.filter((it) => {
                return it.CategoryPlan === id
            })
            setData(filterdata);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        GetDataFireStore();
    }, [id]);

    // Filter items by category
    const filteredProjects = data.filter((project) => {
        return (
            (!searchTerm || project.title.toUpperCase().includes(searchTerm.toUpperCase())) &&
            (!price || parseFloat(project.price.replace(/,/g, '')) >= parseFloat(price)) &&
            (!location || project.location.toUpperCase().includes(location.toUpperCase())) &&
            (!minBedrooms || project.bede >= parseInt(minBedrooms)) &&
            (!maxBedrooms || project.bede <= parseInt(maxBedrooms)) &&
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
        setCurrentPage(1);
    };


    const imgsetin = currentItems.map((it) => (
        <Grid key={it.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
            <div key={it.id} className="slide-item">
                <div className="bg-back">
                    <div className="project-img" style={{ backgroundImage: `url(${it.imageCart})` }}> </div>
                    <div className="City">{it.title}</div>
                    <div className="type" >
                        TYPE: {it.type} <br />
                        SIZES: {it.size}<br />
                        PAYMENT PLAN: {it.payment} <br />
                        HANDOVER: {it.handover} <br />
                        STARTING PRICES: {it.starting} <br />
                    </div>
                    <div className="btn-re">
                        <button onClick={() => {
                            Navigate(`/Seattle/${it.id}`)
                        }} className="btn-register1">More Projects</button>
                    </div>
                    <div className="display-f">
                        <Link to="https://api.whatsapp.com/send/?phone=971502135701&text&type=phone_number&app_absent=0" target="_blank" className="btn-whatsapp"> </Link>
                        <Link to="tel:+971502135701" className="btn-call"></Link>
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
                            placeholder="Price"
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
            <OUREXPERT />
            <Footer />
        </div>
    );
}
