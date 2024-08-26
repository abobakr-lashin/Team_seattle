import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { firestore, storage } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function UpdateBlog() {
    const { id } = useParams(); // Get blog ID from URL
    const [formData, setFormData] = useState({});
    const [fileBlog, setFileBlog] = useState(null); // For file upload
    const [fileCart, setFileCart] = useState(null); // For file upload
    const [blogImageURL, setBlogImageURL] = useState(""); // For displaying blog image
    const [cartImageURL, setCartImageURL] = useState(""); // For displaying cart image
    const [Loading, setLoading] = useState(false); // For loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading when fetching data
            try {
                const docRef = doc(firestore, 'Blogs', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData(data);
                    // Set image URLs if they exist
                    setBlogImageURL(data.fileBlog || "");
                    setCartImageURL(data.fileCart || "");
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            } finally {
                setLoading(false); // Stop loading after fetching data
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'fileBlog') {
            setFileBlog(e.target.files[0]);
        } else if (e.target.name === 'fileCart') {
            setFileCart(e.target.files[0]);
        }
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            DateS: {
                ...prevState.DateS,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading when submitting the form
        try {
            let updatedBlogImageURL = blogImageURL;
            let updatedCartImageURL = cartImageURL;

            if (fileBlog) {
                const fileRefBlog = ref(storage, `blogImages/${fileBlog.name}`);
                await uploadBytes(fileRefBlog, fileBlog);
                updatedBlogImageURL = await getDownloadURL(fileRefBlog);
            }

            if (fileCart) {
                const fileRefCart = ref(storage, `cartImages/${fileCart.name}`);
                await uploadBytes(fileRefCart, fileCart);
                updatedCartImageURL = await getDownloadURL(fileRefCart);
            }

            const updatedData = {
                ...formData,
                fileBlog: updatedBlogImageURL,
                fileCart: updatedCartImageURL
            };

            const docRef = doc(firestore, 'Blogs', id);
            await updateDoc(docRef, updatedData);

            console.log("Document successfully updated!");
            navigate('/dashboard/BlogsUpdete');
        } catch (error) {
            console.error("Error updating document: ", error);
        } finally {
            setLoading(false); // Stop loading after form submission is complete
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
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Update Blog
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6">Upload Blog Image</Typography>
                    <input
                        type="file"
                        name="fileBlog"
                        onChange={handleFileChange}
                        style={{ marginBottom: '10px' }}
                    />
                    {blogImageURL && (
                        <Box
                            component="img"
                            src={blogImageURL}
                            alt="Blog"
                            sx={{ maxWidth: '100%', height: 'auto', marginBottom: 2 }}
                        />
                    )}
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="h6">Upload Cart Image</Typography>
                    <input
                        type="file"
                        name="fileCart"
                        onChange={handleFileChange}
                        style={{ marginBottom: '10px' }}
                    />
                    {cartImageURL && (
                        <Box
                            component="img"
                            src={cartImageURL}
                            alt="Cart"
                            sx={{ maxWidth: '100%', height: 'auto', marginBottom: 2 }}
                        />
                    )}
                </Box>
                <TextField
                    type="text"
                    name="title"
                    label="Title-short"
                    placeholder='Title-short'
                    value={formData.title || ''}
                    onChange={handleChange}
                    inputProps={{ maxLength: 70 }}
                    fullWidth
                    margin="normal"
                />
                <Typography variant="caption">{70 - (formData.title?.length || 0)} characters remaining</Typography>
                <TextField
                    type="text"
                    name="text"
                    label="Text-short"
                    placeholder='Text-short'
                    value={formData.text || ''}
                    onChange={handleChange}
                    inputProps={{ maxLength: 60 }}
                    fullWidth
                    margin="normal"
                />
                <Typography variant="caption">{60 - (formData.text?.length || 0)} characters remaining</Typography>
                <TextField
                    type="number"
                    name="day"
                    label="Day"
                    placeholder='Day'
                    min="1"
                    max="31"
                    value={formData?.DateS?.day || ''}
                    onChange={handleDateChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="number"
                    name="month"
                    label="Month"
                    placeholder='Month'
                    min="1"
                    max="12"
                    value={formData?.DateS?.month || ''}
                    onChange={handleDateChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="number"
                    name="year"
                    label="Year"
                    placeholder='Year'
                    min="1900"
                    max="2100"
                    value={formData?.DateS?.year || ''}
                    onChange={handleDateChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    type="text"
                    name="name"
                    label="Name"
                    placeholder='Name'
                    value={formData.name || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Box sx={{ marginTop: 3 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
