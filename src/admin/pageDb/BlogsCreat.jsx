import React, { useState, useEffect } from 'react';
import { firestore, storage } from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import './BlogsCreat.css';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function BlogsCreat() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [DateS, setDateS] = useState({
        day: '',
        month: '',
        year: ''
    });

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        name: '',
        blogTitle: '',
        blogText: '',
        textInput: '',
        imageLanding: null // لضمان أن الصورة تُخزن هنا بشكل صحيح
    });
    const [Loading, setLoading] = useState(false);
    const [cardImagePreview, setCardImagePreview] = useState(null);
    const [blogImagePreviewLanding, setblogImagePreviewLanding] = useState(null);
    const [blogImagePreview, setBlogImagePreview] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [FileURL, setFileURL] = useState({
        fileCart: null,
        fileBlog: null
    });
    const navigate = useNavigate();

    useEffect(() => {
        const formatDate = () => {
            if (day && month && year) {
                const date = new Date(year, month - 1, day);
                const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
                const formattedDay = new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date);
                const formattedYear = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date);

                setDateS({
                    day: formattedDay,
                    month: formattedMonth,
                    year: formattedYear
                });
            }
        };

        formatDate();
    }, [day, month, year]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCardFileChange = (e) => {
        const file = e.target.files[0];
        setFileURL(prevState => ({
            ...prevState,
            fileCart: file
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            if (cardImagePreview !== reader.result) {
                setCardImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleBlogFileChange = (e) => {
        const file = e.target.files[0];
        setFileURL(prevState => ({
            ...prevState,
            fileBlog: file
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            if (blogImagePreview !== reader.result) {
                setBlogImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleImageLandingChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            imageLanding: file
        }));

        const filePreview = URL.createObjectURL(file);
        if (blogImagePreviewLanding !== filePreview) {
            setblogImagePreviewLanding(filePreview);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.text || !formData.name || !FileURL.fileBlog || !FileURL.fileCart || !formData.imageLanding) {
            alert("Please fill all fields.");
            return;
        }

        setLoading(true);

        try {
            const fileRefBlog = ref(storage, `filesBlog/${FileURL.fileBlog.name}`);
            const fileRefCart = ref(storage, `filesBlog/${FileURL.fileCart.name}`);
            const fileRefCartLanding = ref(storage, `filesBlog/${formData.imageLanding.name}`);

            const [snapshotBlog, snapshotCart, snapshotLanding] = await Promise.all([
                uploadBytes(fileRefBlog, FileURL.fileBlog),
                uploadBytes(fileRefCart, FileURL.fileCart),
                uploadBytes(fileRefCartLanding, formData.imageLanding)
            ]);

            const urlBlog = await getDownloadURL(fileRefBlog);
            const urlCart = await getDownloadURL(fileRefCart);
            const landingImage = await getDownloadURL(fileRefCartLanding);

            await addDoc(collection(firestore, 'Blogs'), {
                title: formData.title,
                text: formData.text,
                name: formData.name,
                DateS,
                blogTitle: formData.blogTitle,
                fileCart: urlCart,
                fileBlog: urlBlog,
                imageLanding: landingImage,
                textInput: formData.textInput
            });

            setFormData({
                title: '',
                text: '',
                name: '',
                blogTitle: '',
                blogText: '',
                imageLanding: null
            });
            setDay('');
            setMonth('');
            setYear('');
            setCardImagePreview(null);
            setBlogImagePreview(null);

            setSubmitSuccess(true);
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 3000);

            navigate('/dashboard/BlogsUpdete');

        } catch (error) {
            console.error("Error uploading file or adding document:", error);
        } finally {
            setLoading(false);
        }
    };

    if (Loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <h1>Create Cards</h1>
            {submitSuccess && <div className="success-message">Form submitted successfully!</div>}
            <form className="cardcreat" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="file" onChange={handleCardFileChange} placeholder='Upload card image' />
                    {cardImagePreview && <img src={cardImagePreview} alt="Card Preview" className="image-preview" />}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        placeholder='Title-short'
                        value={formData.title}
                        onChange={handleChange}
                        maxLength="70"
                    />
                    <span>{70 - formData.title.length} characters remaining</span>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="text"
                        placeholder='Text-short'
                        value={formData.text}
                        onChange={handleChange}
                        maxLength="60"
                    />
                    <span>{60 - formData.text.length} characters remaining</span>
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder='Day'
                        min="1"
                        max="31"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='Month'
                        min="1"
                        max="12"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder='Year'
                        min="1900"
                        max="2100"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="date-display">{`${DateS.month} ${DateS.day}, ${DateS.year}`}</div>

                <h1>Create Blogs</h1>

                <div className="form-group">
                    <input type="file" name="blogFile" onChange={handleBlogFileChange} placeholder='Upload blog image' />
                    {blogImagePreview && <img src={blogImagePreview} alt="Blog Preview" className="image-preview" />}
                </div>
                <div className="form-group">
                    <input type="file" name="imageLanding" onChange={handleImageLandingChange} placeholder='Upload blog image Landing' />
                    {blogImagePreviewLanding && <img src={blogImagePreviewLanding} alt="Blog Preview" className="image-preview" />}
                </div>
                <div className="form-group">
                    <input type="text" name="blogTitle" placeholder='Title' value={formData.blogTitle} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.text || ""}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            if (data !== formData.textInput) {
                                setFormData({ ...formData, textInput: data });
                            }
                        }}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
