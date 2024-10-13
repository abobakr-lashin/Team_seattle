import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig'; // تأكد من أن مسار الاستيراد صحيح
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export default function AddCardBuy() {
    const navigate = useNavigate();
    const [FileURLs, setFileURLs] = useState([]);
    const [FileImage, setFileImages] = useState([]);
    const [urlImge, setUrlImge] = useState(null);
    const [ImgeCart, setImgeCart] = useState(null);
    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDataImage, setFormDataImage] = useState('');
    const [CategoryBuyLocation, setCategoryBuyLocation] = useState([]);
    const [CategoryDevelopers, setCategoryDevelopers] = useState([]);
    const [CategoryPlan, setCategoryPlan] = useState([]);
    const [CateBuyLocation, setCateBuyLocation] = useState({
        location: '',
        center: '',
    });
    const [Centers, setCenters] = useState([]);
    const [formDataImageText, setFormDataImageText] = useState('');
    const [ImgeCartText, setImgeCartText] = useState('');
    const [formClintImage, setformClintImage] = useState(null);
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
        mainTitle: '',
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
            // Upload slider Images)
            const uploadedFileURLs = await Promise.all(FileURLs.map(async (file) => {
                const fileRef = ref(storage, `files/${file.name}`);
                await uploadBytes(fileRef, file);
                return await getDownloadURL(fileRef);
            }));

            // Upload listingImage
            if (!formClintImage) {
                throw new Error('Listing Image is required.');
            }

            // Upload listingImage
            const fileRefBlog = ref(storage, `filesBlog/${formClintImage.name}`);
            await uploadBytes(fileRefBlog, formClintImage);
            const BgImage = await getDownloadURL(fileRefBlog);

            // Cheak image Cart
            if (!formDataImage) {
                throw new Error('Image Cart is required.');
            }

            // Upload imageCart
            const fileRefImageCart = ref(storage, `filesBlog/${formDataImage.name}`);
            await uploadBytes(fileRefImageCart, formDataImage);
            const BgImageCard = await getDownloadURL(fileRefImageCart);

            // Cheak image Text
            if (!formDataImageText) {
                throw new Error('Image Text is required.');
            }

            //Upload imageText
            const fileRefImage = ref(storage, `files/${formDataImageText.name}`);
            await uploadBytes(fileRefImage, formDataImageText);
            const BgImageText = await getDownloadURL(fileRefImage);


            // Send Data to Firestore
            await addDoc(collection(firestore, 'listBlogsCartBuy'), {
                ...formData,

                listingImage: BgImage,

                imageCart: BgImageCard,

                imageText: BgImageText,

                imageSlider: uploadedFileURLs,
                CateBuyLocation,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString(),
            });



            toast.success('Data submitted successfully!');
            setFormData({
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
                imageCart: null,
            });
            navigate('/dashboard/Buy');
        } catch (err) {
            toast.error('Error submitting data: ' + err.message);
            console.error('Error submitting data:', err);
        } finally {
            setLoading(false);
        }
    };




    // Get Category data
    const getCategories = async () => {
        try {

            const categorySnapshot = await getDocs(collection(firestore, "category"));
            const categoryDocs = categorySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategories(categoryDocs);
        } catch (error) {
            console.error("Error fetching category documents: ", error);
        }

        try {
            const locationSnapshot = await getDocs(collection(firestore, "CategoryBuyLocation"));
            const locationDocs = locationSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategoryBuyLocation(locationDocs);
        } catch (error) {
            console.error("Error fetching CategoryBuyLocation documents: ", error);
        }

        try {

            const developersSnapshot = await getDocs(collection(firestore, "CategoryDevelopers"));
            const developersDocs = developersSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategoryDevelopers(developersDocs);
        } catch (error) {
            console.error("Error fetching CategoryDevelopers documents: ", error);
        }

        try {

            const planSnapshot = await getDocs(collection(firestore, "categoryBuyPlan"));
            const planDocs = planSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategoryPlan(planDocs);
        } catch (error) {
            console.error("Error fetching categoryBuyPlan documents: ", error);
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
            <form className="cardcreat" onSubmit={handleSubmit}>
                <h1>Create Cards</h1>

                {/* تحميل صورة البطاقة */}
                <div className="form-group">
                    <label htmlFor="imageCart" style={{ fontSize: '30px' }}>
                        Image Cart
                    </label>
                    <input
                        id="imageCart"
                        type="file"
                        name="listingImage"
                        onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0]);
                            setImgeCart(file);
                            setFormDataImage(e.target.files[0]);
                        }}
                    />
                    <div className="img">
                        {ImgeCart && (
                            <img
                                src={ImgeCart}
                                alt="ImageCart"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                </div>

                {/* تحميل صورة نص البطاقة */}
                <div className="form-group">
                    <label htmlFor="imageCartText" style={{ fontSize: '30px' }}>
                        Image Cart Text
                    </label>
                    <input
                        id="imageCartText"
                        type="file"
                        name="imageText"
                        onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0]);
                            setImgeCartText(file);
                            setFormDataImageText(e.target.files[0]);
                        }}
                    />
                    <div className="img">
                        {ImgeCartText && (
                            <img
                                src={ImgeCartText}
                                alt="ImgeCartText"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                </div>

                {/* حقول النصوص */}
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="mainTitle"
                        placeholder="Enter Your main Title"
                        value={formData.mainTitle}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="currency"
                        placeholder="Name of the currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        name="beds"
                        placeholder="BEDS"
                        value={formData.beds}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="baths"
                        placeholder="BATHS"
                        value={formData.baths}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="square"
                        placeholder="SQUARE"
                        value={formData.square}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="parking"
                        placeholder="Parking"
                        maxLength="50"
                        value={formData.parking}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        maxLength="50"
                        value={formData.location} // تم تصحيح القيمة هنا
                        onChange={handleInputChange}
                    />
                </div>

                <h1>Landing Page</h1>

                {/* تحميل صورة المنزلق */}
                <div className="form-group">
                    <label htmlFor="slider" style={{ fontSize: '30px' }}>
                        Image Slider
                    </label>
                    <input
                        id="slider"
                        type="file"
                        name="sliderImages"
                        multiple
                        onChange={(e) => {
                            setFileURLs(Array.from(e.target.files));
                            const files = Array.from(e.target.files);
                            setFileImages(files);
                        }}
                    />

                    <div className="image">
                        {FileImage.map((it, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(it)}
                                alt={`preview-${index}`}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                            />
                        ))}
                    </div>
                </div>

                {/* حقول إضافية */}
                <div className="form-group">
                    <input
                        type="text"
                        name="monthlyPayment"
                        placeholder="Monthly Payment"
                        min="1"
                        value={formData.monthlyPayment}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="listingName"
                        placeholder="Listing Name"
                        value={formData.listingName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="stars"
                        placeholder="Stars (⭐⭐)"
                        value={formData.stars}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="map"
                        placeholder="Map"
                        value={formData.map}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="listingImage" style={{ fontSize: '30px' }}>
                        Image Listing By
                    </label>
                    <input
                        id="listingImage"
                        type="file"
                        name="listingImage"
                        onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0]);
                            setUrlImge(file);
                            setformClintImage(e.target.files[0]);
                        }}
                    />
                    <div className="img">
                        {urlImge && (
                            <img
                                src={urlImge}
                                alt="listingImage"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />
                        )}
                    </div>
                </div>

                {/* قائمة الفئات */}
                <div className="form-group">
                    <select
                        style={{ margin: '20px', width: '80%' }}
                        name="category"
                        value={formData.category}
                        onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value });
                        }}
                    >
                        <option hidden>Select Category</option>
                        {Categories.map((it) => (
                            <option key={it.id} value={it.name}>{it.name}</option>
                        ))}
                    </select>
                </div>

                {/* قائمة الموقع والمراكز */}
                <div className="form-group">
                    {/* قائمة اختيار الموقع */}
                    <select
                        style={{ margin: '20px', width: '80%' }}
                        name="location"
                        value={CateBuyLocation.location}
                        onChange={(e) => {
                            setCateBuyLocation({ ...CateBuyLocation, location: e.target.value, center: '' });
                        }}
                    >
                        <option hidden>Select Category Location</option>
                        {CategoryBuyLocation.map((it) => (
                            <option key={it.id} value={it.location}>{it.location}</option>
                        ))}
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
                        </select>
                    )}
                </div>

                {/* قائمة مطورين */}
                <div className="form-group">
                    <select
                        style={{ margin: '20px', width: '80%' }}
                        name="CategoryDevelopers"
                        value={formData.CategoryDevelopers}
                        onChange={(e) => {
                            setFormData({ ...formData, CategoryDevelopers: e.target.value });
                        }}
                    >
                        <option hidden>Select Category Developers</option>
                        {CategoryDevelopers.map((it) => (
                            <option key={it.id} value={it.name}>{it.name}</option>
                        ))}
                    </select>
                </div>


                <div className="form-group">
                    <select
                        style={{ margin: '20px', width: '80%' }}
                        name="CategoryPlan"
                        value={formData.CategoryPlan}
                        onChange={(e) => {
                            setFormData({ ...formData, CategoryPlan: e.target.value });
                        }}
                    >
                        <option hidden>Select Category Buy Plan</option>
                        {CategoryPlan.map((it) => (
                            <option key={it.id} value={it.name}>{it.name}</option>
                        ))}
                    </select>
                </div>

                {/* محرر النصوص */}
                <div className="form-group">
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.text || ""}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setFormData({ ...formData, text: data });
                        }}
                        config={{
                            height: '400px',
                        }}
                    />
                </div>

                <br /><br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
