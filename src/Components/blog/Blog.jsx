import React, { useState, useEffect } from "react";
import NavPar from "../appbar/NavPar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Grid from "@mui/material/Grid";
import ReplyIcon from '@mui/icons-material/Reply';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Footer from "../footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./blogs.css";
import { MuiTelInput } from "mui-tel-input";
import { Snackbar, Alert } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import FormBlog from "./_components/FormBlog";
import Category from "./_components/category";

export default function Blog() {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        phone: "+971",
        email: "",
        message: "",
    });
    const [submittedRequests, setSubmittedRequests] = useState([]); // مصفوفة جديدة لتخزين الطلبات المرسلة
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(firestore, 'Blogs', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(data);
                    // Set image URLs if they exist
                    // setBlogImageURL(data.fileBlog || "");
                    // setCartImageURL(data.fileCart || "");
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchData();
    }, [id]);

    console.log(formData);

    const [language, setLanguage] = useState(
        navigator.language.startsWith("ar") ? "ar" : "en"
    );

    useEffect(() => {
        setLanguage(navigator.language.startsWith("ar") ? "ar" : "en");
    }, []);

    useEffect(() => {
        console.log("Submitted Requests:", submittedRequests); // طباعة المصفوفة في الكونسول عند التغيير
    }, [submittedRequests]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handlePhoneChange = (newValue) => {
        setFormData((prevData) => ({ ...prevData, phone: newValue }));

        const phoneLength = newValue.replace(/\D/g, "").length; // Remove non-numeric characters and get length
        if (phoneLength > 15 || phoneLength < 10) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                phone: language === "ar"
                    ? "رقم الهاتف يجب أن يتراوح بين 10 و 15 رقماً"
                    : "Phone number must be between 10 and 15 digits"
            }));
        } else {
            setFormErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
        }
    };

    const handleLike = () => {
        setLiked(!liked);
    };

    const handleShare = () => {
        setShared(true);
        setTimeout(() => setShared(false), 2000); // إعادة التعيين بعد 2 ثانية
    };


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className="blog">
            <div
                className="bg-img"
                style={{
                    backgroundImage: `url(/uploads/Finish/Finish/blog/background.png)`,
                }}
            >
                <NavPar />
                <div className="h-10vh"></div>
                <div className="h-5vh"></div>
                <div className="grop-title4">
                    <div className="img-dis">
                        <img src="/uploads/img/marpa.png" alt="" />
                    </div>
                    <div className="title-dis7">
                        <div>
                            Home{" "}
                            <Link to={"/"}>   <KeyboardDoubleArrowRightIcon  sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link> 

                            BLOGS
                            <Link to={"/LatestNews"}>   <KeyboardDoubleArrowRightIcon  sx={{ color: "#d3b76d", fontSize: "65px" }} /></Link> 

                        </div>
                        <div className="title-blog">
                            <p>{formData.blogTitle}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Grid container spacing={2}>
                <Grid sx={{flex:"start"}} item xs={12} md={8}>
                    <div className="prgraf-blog ">
                        <p style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", padding: "10px",}}>
                            {formData.textInput}
                        </p>
                        {/* ... (remaining blog content) */}
                        <div className="display5">
                            <button className="like" onClick={handleLike} style={{ color: liked ? 'red' : 'inherit' }}>
                                like <ThumbUpIcon sx={{ color: liked ? 'red' : 'inherit' }} />
                            </button>
                            <button className="share" onClick={handleShare}>
                                share <ReplyIcon className="rotated-icon" />
                            </button>
                            {shared && <div className="shared-notice">Content Shared!</div>}
                        </div>

                        {/* Textarea */}
                        <textarea
                            className="text-blogs"

                            placeholder="Message"
                            name="message"
                            label="Message"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={4}
                            required
                            style={{
                                whiteSpace: "pre-wrap",
                                padding: "8px",
                                marginBottom: "8px",
                                boxSizing: "border-box",
                            }}
                            value={formData.message}
                            onChange={handleChange}
                        />
                        {/* Textarea */}
                    </div>
                </Grid>
                <Grid className="sticky-element" item xs={12} md={4}>
      <div className="about-me">
        <div className="about">
          <div className="about-title">ABOUT ME</div>
          <div className="img-me-name">
            <img src={formData.fileBlog} alt="" />
            <h4>{formData.name}</h4>
          </div>
        </div>
        <div className="hr3"></div>
        <div className="recent-posts">
          <h5>RECENT POSTS</h5>
          <Category id={id} />
        </div>
      </div>
      <div className="follow-us">
        <h5>FOLLOW US</h5>
        <div className="social-icons">
          <Link to="https://www.facebook.com/seattleme" target="_blank">
            <img src="/uploads/Finish/Finish/blog/facebook_1384005.png" alt="Facebook" />
          </Link>
          <Link to="https://www.instagram.com/seattlemiddleeast/" target="_blank">
            <img src="/uploads/Finish/Finish/blog/instagram_1384015.png" alt="Instagram" />
          </Link>
          <Link to="https://www.threads.net/@seattlemiddleeast" target="_blank">
            <img src="/uploads/Finish/Finish/blog/threads.png" alt="threads" />
          </Link>
          <Link to="https://www.linkedin.com/company/seattleme/" target="_blank">
            <img src="/uploads/Finish/Finish/blog/linkedin_1384014.png" alt="LinkedIn" />
          </Link>
          <Link to="https://www.snapchat.com/add/semabudhabi?invite_id=9MOLq1lA&locale=en_AE&share_id=warI0iHcROaLw-YwHLVqzw&sid=73c8101497ec451ebc15376ae6742048" target="_blank">
            <img src="/uploads/Finish/Finish/blog/snapchat_3669965.png" alt="snapchat" />
          </Link>
        </div>
      </div>
      <div className="need-help">
        <img src="/uploads/Finish/Finish/blog/qu.png" alt="help" />
        <h5>We have a ready team to assist you and respond to your inquiries</h5>
        <FormBlog />
      </div>
    </Grid>
            </Grid>
            <div className="h-5vh"></div>
            <div className="h-5vh"></div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Footer />
        </div>
    );
}
