import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function AddCartDevelopers() {
    const Navigate = useNavigate()
    const [FileURLs, setFileURLs] = useState([])
    const [FileImage, setFileImages] = useState([])
    const [urlImge, setUrlImge] = useState(null)
    const [ImgeCart, setImgeCart] = useState(null)
    const [Categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDataImage, setformDataImage] = useState('')
    const [CategoryBuyLocation, setCategoryBuyLocation] = useState([])
    const [CategoryDevelopers, setCategoryDevelopers] = useState([])
    const [CategoryDevelops, setCategoryDevelops] = useState([])
    const [formData, setFormData] = useState({});


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {

            const fileRefImageCart = ref(storage, `filesBlog/${formDataImage.name}`);

            const [snapshotBlog, snapshotCart] = await Promise.all([
                uploadBytes(fileRefImageCart, formDataImage),
            ]);

            const BgImageCard = await getDownloadURL(fileRefImageCart);


            // Send Data TO fierStore
            await addDoc(collection(firestore, 'listCartDevelopers'), {
                title: formData.title,
                location: formData.location,
                imageCart: BgImageCard,
                company: formData.company,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });

            toast.success('Data submitted successfully!');
            setFormData({
                title: '',
                location: '',
                imageCart: null,
                company:''
            });
            Navigate('/dashboard/Developers')
        } catch (err) {
            toast.error('Error submitting data: ' + err.message);
            console.error('Error submitting data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get Data Category
    const getCategories = async () => {
        // get Category Locations  
        try {
            const querySnapshot = await getDocs(collection(firestore, "CategoryBuyLocation"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategoryBuyLocation(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }

        try {
            const querySnapshot = await getDocs(collection(firestore, "CategoryDevelopers"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategoryDevelops(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <div>
                <form className="cardcreat" onSubmit={handleSubmit}>
                    <h1>Create Cards</h1>
                    <div className="form-group">
                        <label htmlFor="me" style={{ fontSize: '30px' }}>
                            Image Cart
                        </label>
                        <input id="me" type="file" name="listingImage" onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0])
                            setImgeCart(file)
                            setformDataImage(e.target.files[0])
                        }} />
                        <div className="img">
                            {ImgeCart && <img
                                src={ImgeCart}
                                alt="ImageCart"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />}
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <select onChange={handleInputChange} style={{
                        fontSize: '20px',
                        padding: '10px',
                        marginBottom: '10px',
                        width: '100%'
                    }} name="location" id="location">
                        <option hidden>Select Location</option>
                        {CategoryBuyLocation.map((item) => (
                            <option key={item.id} value={item?.category?.location}>
                                {item?.category?.location}
                            </option>
                        ))}
                    </select>
                    <h5>Enter the company name</h5>
                    <select onChange={handleInputChange} style={{
                        fontSize: '20px',
                        padding: '10px',
                        marginBottom: '10px',
                        width: '100%'
                    }} name="company" id="company">
                        <option hidden>Select Category</option>
                        {CategoryDevelops.map((item) => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </>
    );
}
