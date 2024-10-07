import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from '@mui/icons-material/Search';
import "./project.css";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Link, useParams } from 'react-router-dom';

export default function DetailsItems() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 9;
    const {id} = useParams()


    // Get Data Cart Firebase
    const getCategories = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartAreas"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const FilterData = docs.filter((it)=>it?.CateBuyLocation?.location === id)
            setData(FilterData);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching documents: ", error);
        } finally {
            setLoading(false);
        }
    };


    const filteredProjects = data.filter((project) =>
        project.CateBuyLocation.location.toUpperCase().includes(searchTerm.toUpperCase())
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const our = currentItems.map((it) => {
        return (
            <Grid key={it.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
                <div className="all-Abudhabi">
                    <div className="img-Abudhabi">
                        <div
                            className="bg-imga"
                            style={{ backgroundImage: `url(${it.imageCart})` }}
                        ></div>
                        <h2>{it.CateBuyLocation.location}</h2>
                        <h3>
                            {it.CateBuyLocation.center}
                        </h3>
                        <div className="dis">
                            <div>
                                <div className="btn-t">
                                    <Link to={`/Areas/Buy/category/Location/${it.CateBuyLocation.center}`}>Buy Property</Link>
                                </div>
                                <div className="btn-t">
                                    <Link to={`/Areas/Rent/category/Location/${it.CateBuyLocation.center}`}>Rent Property</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grid>
        );
    });

    useEffect(() => {
        getCategories();
    }, [id]);


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <div className="img-Commercial">
                <h2 style={{ textTransform: "uppercase" }}>
                    COMMERCIAL PROPERTIES SEND A REQUEST
                </h2>
                <div className="search-container">
                    <LocationOnIcon className="search-icon" />
                    <input
                        type="search"
                        placeholder="Search Area Name"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <SearchIcon className="search-end-icon" />
                </div>
            </div>
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
        </div>
    );
}
