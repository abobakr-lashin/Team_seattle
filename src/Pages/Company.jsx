import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Grid } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NavPar from '../Components/appbar/NavPar';
import "../Components/buy/buy.css";
import OUREXPERT from './OUREXPERT';
import Footer from '../Components/footer/Footer';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';



const Company = () => {
    const { id } = useParams()
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
    const [Products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 9;


    
    // const filteredProjects = imgSaleIn.filter((project) => {
    //     return (
    //         (!searchTerm || project.title.toUpperCase().includes(searchTerm.toUpperCase())) &&
    //         (!price || parseFloat(project.money.replace(/,/g, '')) >= parseFloat(price)) &&
    //         (!location || project.LocationOn.toUpperCase().includes(location.toUpperCase())) &&
    //         (!minBedrooms || project.bed >= parseInt(minBedrooms)) &&
    //         (!maxBedrooms || project.bed <= parseInt(maxBedrooms)) &&
    //         (!minPrice || parseFloat(project.money.replace(/,/g, '')) >= parseFloat(minPrice)) &&
    //         (!minArea || project.square >= parseFloat(minArea)) &&
    //         (!maxArea || project.square <= parseFloat(maxArea))
    //     );
    // });



    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

    // const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    // const handleNextPage = () => {
    //     if (currentPage < totalPages) {
    //         setCurrentPage(currentPage + 1);
    //     }
    // };

    // const handlePreviousPage = () => {
    //     if (currentPage > 1) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // };

    // const handleSearch = () => {
    //     setCurrentPage(1);
    // };


    // Get Data Category
    const getCategories = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(firestore, "listingsBlogs"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        } finally {
            setLoading(false);
        }
    };

    console.log(loading);

    useEffect(() => {
        getCategories();
    }, []);

    const FilterProducts = Products.filter((it) => it.category === id)


    const imgsetin = FilterProducts.map((it) => (
        <Grid key={it.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
            <div className="CONTER">
                <div className="bg-back">
                    <div className="img-imgSaleIn">
                        <img className="imgSaleIn" src={it.imageCart} alt={it.title} />
                        <h3>
                            {it.price} <span>{it.currency}</span>
                        </h3>
                        <div className="dis-play">
                            <div>
                                <span>
                                    <span>{it.beds}</span> <img src={'/uploads/commercial/export/icon/bed.png'} alt="Bed" />
                                </span>
                                <div>BEDS</div>
                            </div>
                            <div>
                                <span>
                                    <span>{it.baths}</span> <img src={'/uploads/commercial/export/icon/bath.png'} alt="Bath" />
                                </span>
                                <div>Baths</div>
                            </div>
                            <div>
                                <span>
                                    <span>{it.square}</span> <img src={'/uploads/commercial/export/icon/square.png'} alt="Square" />
                                </span>
                                <div>Square ft</div>
                            </div>
                        </div>
                        <h5>{it.title}</h5>
                        <h6>
                            <LocationOnIcon /> {it.locationOn}
                            <hr />
                            <div className="Listing-by">
                                <div className="img-lisby">
                                    <img src={it.bgImage} alt="Property" />
                                </div>
                                <div className="title-lisby">Listing by Ramin Sadeghi </div>
                            </div>
                        </h6>
                    </div>
                </div>
            </div>
        </Grid>
    ));

    if (loading) {
        return (
            <div className="loader">
                <div className="justify-content-center jimu-primary-loading"></div>
            </div>
        );
    }

    return (
        <>
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
                                onClick={'handleSearch'}
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
                        <div onClick={'handlePreviousPage'} style={{ cursor: currentPage > 1 ? 'pointer' : 'default', opacity: currentPage > 1 ? 1 : 0.5 }}>
                            <img src="/uploads/commercial/export/northarrow.png" alt="Previous" />
                        </div>
                        <h2 style={{ margin: '0 10px' }}>{currentPage}</h2>
                        <div onClick={'handleNextPage'} style={{ cursor: currentPage < 'totalPages' ? 'pointer' : 'default', opacity: currentPage < 'totalPages' ? 1 : 0.5 }}>
                            <img src="/uploads/commercial/export/rightarrow.png" alt="Next" />
                        </div>
                    </div>
                </div>



                <OUREXPERT />

                <Footer />
            </div>
        </>
    );
}

export default Company;
