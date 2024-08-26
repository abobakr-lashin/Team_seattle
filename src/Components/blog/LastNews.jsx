import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Footer from "../footer/Footer";
import "./LatestNews.css";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

export default function LastNews({newsPerPage}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [FormData, setFormData] = useState([]);

    const navigate = useNavigate();

    // Get Data from Firestore
    const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "Blogs"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFormData(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        GetDataFireStore();
    }, []);

    // console.log(FormData);
    

    const handleNext = () => {
        setCurrentPage((prevPage) =>
            prevPage + 1 > Math.ceil(FormData.length / newsPerPage) ? 1 : prevPage + 1
        );
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) =>
            prevPage - 1 < 1 ? Math.ceil(FormData.length / newsPerPage) : prevPage - 1
        );
    };

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = FormData.slice(indexOfFirstNews, indexOfLastNews);

    // console.log(currentNews);
    

    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };
  return (

    <div className="">
    <div className="news-container">
    {currentNews.length > 0 ? (
        <div className="news-grid">
            {currentNews.map((item) => (
                <div
                    className="img-LatestNews1"
                    key={item.id}
                    style={{ backgroundImage: `url(${item.fileCart})` }}
                >
                    <div className="news-title">{item.title}</div>
                    <div className="news-text">{item.text}</div>
                    <button onClick={() => handleReadMore(item.id)} className="read-More">
                        Read More...
                    </button>
                    <div className="avatar">
                        <PersonIcon /> {item.name}
                    </div>
                    <div className="date">
                        <CalendarMonthIcon /> {item?.DateS?.day} / {item?.DateS?.month} / {item?.DateS?.year}
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p>No news</p>
    )}
</div>

{FormData.length > newsPerPage && (
    <div className="navigation-buttons">
        <button onClick={handlePrevious} className="nav-button">
            <KeyboardDoubleArrowLeftIcon
                sx={{ color: "white", fontSize: "45px" }}
            />
        </button>
        <div
            style={{
                fontSize: "25px",
                color: "#d3b76d",
                padding: "10px",
                fontWeight: "bold",
            }}
        >
            {currentPage}
        </div>
        <button onClick={handleNext} className="nav-button">
            <KeyboardDoubleArrowRightIcon
                sx={{ color: "white", fontSize: "45px" }}
            />
        </button>
    </div>
)}
</div>
        )
    }
    
