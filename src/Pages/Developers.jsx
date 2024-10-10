import { Box, Grid } from '@mui/material'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link, useParams } from 'react-router-dom';
import NavPar from './../Components/appbar/NavPar'
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Footer from './../Components/footer/Footer.jsx'
import "./Developers.css"

import { useEffect, useState } from 'react';
import OUREXPERT from './OUREXPERT';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig.js';

export default function Developers() {
    const { id } = useParams()
    const [dataCart, setDataCart] = useState([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryDevelopers, setCategoryDevelopers] = useState([]);
    const itemsPerPage = 9;

    const GetDataFireBase = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartBuy"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const fiterData = docs.filter((it) => it.CategoryDevelopers === id)

            setDataCart(fiterData);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }



        try {
            const querySnapshot = await getDocs(collection(firestore, "CategoryDevelopers"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(docs);
            const fiterData = docs.filter((it) => it.name === id)
            setCategoryDevelopers(fiterData);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }

    useEffect(() => {
        GetDataFireBase();
    }, []);


    const filteredProjects = dataCart?.filter((project) =>
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


    console.log(categoryDevelopers[0]?.bannerCart);



    const our = currentItems?.map((it) => {
        return (
            <Grid key={it.id} sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>
                <div className="all-Abudhabi">
                    <div className="img-Abudhabi">
                        <div
                            className="bg-imga"
                        > <img src={`${it.imageCart}`} alt="" /> </div>
                        <h2>{it.mainTitle}</h2>
                        <h3>
                            <LocationOnIcon /> {it.CateBuyLocation.location}
                        </h3>
                        <div className="dis">
                            <div>
                                <div className="btn-t">
                                    <Link to={`/Buy/Category/Location/${it.CateBuyLocation.location}`}>buy Property</Link>
                                </div>
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
                        <h1>Home <Link to={"/"}><KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} /> </Link>     <div style={{ textTransform: "uppercase" }}>Developers <Link to={"/Ourpartners"}><KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} /> </Link> </div>   </h1>
                        <div>{categoryDevelopers[0]?.name}</div>
                    </div>
                </div>

                <Box sx={{
                    width: "80%", margin: "20px auto"
                }}>
                    <div className="img-Developerss" style={{ backgroundImage: `url(${categoryDevelopers[0]?.bannerCart})` }}>
                        
                    </div>

                    <h2>Our projects</h2>
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
                    <OUREXPERT />
                    <h2>Built in Districts</h2>


                </Box>
                <Grid sx={{ width: "100%" }} spacing={5}>

                    <Grid className='imgcate' sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>

                        <img width={"35%"} style={{ margin: "15px" }} src={categoryDevelopers[0]?.banner1} alt="" />
                        <img width={"20%"} style={{ margin: "15px" }} src={categoryDevelopers[0]?.banner2} alt="" />
                        <img width={"20%"} style={{ margin: "15px" }} src={categoryDevelopers[0]?.banner3} alt="" />


                    </Grid>

                </Grid>
                <Grid sx={{ width: "100%" }} spacing={5}>

                    <Grid className='imgcate' sx={{ margin: "auto", width: "100%", textAlign: "center" }} item xs={12} md={4} sm={6}>

                        <img width={"20%"} style={{ margin: "15px" }} src={categoryDevelopers[0]?.banner4} alt="" />
                        <img width={"20%"} style={{ margin: "15px" }} src={categoryDevelopers[0]?.banner5} alt="" />
                        <img width={"35%"} style={{ margin: "15px" }} src={categoryDevelopers[0]?.banner6} alt="" />
                    </Grid>
                </Grid>
                <div className="h-5vh"></div>
                <Footer />
            </div>
        </div>
    )
}