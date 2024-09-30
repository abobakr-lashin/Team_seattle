import { Grid } from '@mui/material';
import React, { useState } from 'react';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from '@mui/icons-material/Search';
import "./project.css";

export default function AbudhabiDetails() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // لتتبع مصطلح البحث
    const itemsPerPage = 9;

    const ourProject = [
        { id: 1, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLAN `, Price: " Price from 410,300 AED" },
        { id: 2, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price: " Emaar south" },
        { id: 3, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price: " Emaar south" },
        { id: 4, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price: " Emaar south" },
        { id: 5, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`, Price: " Price from 410,300 AED" },
        { id: 6, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price: " Emaar south" },
        { id: 7, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price: " Emaar south" },
        { id: 8, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price: " Emaar south" },
        { id: 9, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`, Price: " Price from 410,300 AED" },
        { id: 10, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price: " Emaar south" },
        { id: 11, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price: " Emaar south" },
        { id: 12, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price: " Emaar south" },
        { id: 13, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`, Price: " Price from 410,300 AED" },
        { id: 14, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price: " Emaar south" },
        { id: 15, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price: " Emaar south" },
        { id: 16, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price: " Emaar south" },
        { id: 17, src: "/uploads/developerprojects/export/photo2.png", name: `AL REEM ISLANّ`, Price: " Price from 410,300 AED" },
        { id: 18, src: "/uploads/developerprojects/export/photo2.png", name: "SAADIYAT ISLAND", Price: " Emaar south" },
        { id: 19, src: "/uploads/developerprojects/export/photo2.png", name: " YAS ISLAND", Price: " Emaar south" },
        { id: 20, src: "/uploads/developerprojects/export/photo2.png", name: "OUR EXPERT WILL HELP YOU", Price: " Emaar south" },

    ];

    // تصفية المشاريع بناءً على مصطلح البحث
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // إعادة الصفحة إلى الأولى عند البحث
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
                            {img.Price}
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
                        onChange={handleSearchChange} // تتبع تغيير النص في حقل البحث
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
