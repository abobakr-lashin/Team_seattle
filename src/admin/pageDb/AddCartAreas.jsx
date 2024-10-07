import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css'; // استيراد الأنماط الافتراضية لـ Quill.js
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig'; // تأكد من أن مسار الاستيراد صحيح
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';



export default function AddCartAreas() {
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
    const [CategoryPlan, setCategoryPlan] = useState([])
    const [Centers, setCenters] = useState([]);
    const [CateBuyLocation, setCateBuyLocation] = useState({
        location: '',
        center: '',
    });
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        price: '',
        currency: '',
        beds: '',
        baths: '',
        square: '',
        parking: '',
        location: '',
        monthlyPayment: '',
        listingName: '',
        stars: '',
        email: '',
        map: '',
        category: '',
        listingImage: null,
        CategoryDevelopers: '',
        CategoryPlan: '',
    });

        // Update 
        useEffect(() => {
            const selectedLocation = CategoryBuyLocation.find(loc => loc.location === CateBuyLocation.location);
            if (selectedLocation) {
                setCenters(selectedLocation.centers || []);
            } else {
                setCenters([]);
            }
        }, [CateBuyLocation.location, CategoryBuyLocation]);
    
    


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
            await addDoc(collection(firestore, 'listBlogsCartAreas'), {
                imageCart: BgImageCard,
                CateBuyLocation,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });

            toast.success('Data submitted successfully!');
            setFormData({
                monthlyPayment: '',
                listingName: '',
                stars: '',
                email: '',
                map: '',
                category: '',
                listingImage: null,
                imageCart: null
            });
            Navigate('/dashboard/Areas')
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
        <div>
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
                        <select style={{ margin: '20px', width: '80%' }} name="category" onChange={(e) => {
                            setCateBuyLocation({ ...CateBuyLocation, location: e.target.value });
                        }}>
                            <option hidden >Select Category Location</option>
                            {CategoryBuyLocation.map((it) => {
                                return <option key={it.id} value={it?.location}>{it?.location}</option>
                            })}
                        </select>

                        {Centers.length > 0 && (
                        <select
                            style={{ margin: '20px', width: '80%' }}
                            name="center"
                            value={CateBuyLocation.center}
                            onChange={(e) => {
                                setCateBuyLocation({ ...CateBuyLocation, center: e.target.value });
                            }}
                        >
                            <option hidden>Select Center</option>
                            {Centers.map((center, index) => (
                                <option key={index} value={center.name}>{center.name}</option>
                            ))}
                        </select>)}
                    </div>

                    <br /><br />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
}
