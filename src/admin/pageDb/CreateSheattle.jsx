import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig'; // تأكد من أن مسار الاستيراد صحيح
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';



export default function CreateSheattle() {
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
    const [CateBuyLocation, setCateBuyLocation] = useState({
        location: '',
        center: '',
    });
    const [formDataImageText, setformDataImageText] = useState('');
    const [ImgeCartText, setImgeCartText] = useState('');
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setUrlImge(URL.createObjectURL(e.target.files[0]))

        if (name === 'sliderImages') {
            setFormData({
                ...formData,
                [name]: Array.from(files),
            });
        } else {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const uploadedFileURLs = await Promise.all(FileURLs.map(async (file) => {
                const fileRef = ref(storage, `files/${file.name}`);
                await uploadBytes(fileRef, file);
                return await getDownloadURL(fileRef);
            }));

            const fileRefBlog = ref(storage, `filesBlog/${formData.listingImage.name}`);
            const fileRefImageCart = ref(storage, `filesBlog/${formDataImage.name}`);
            const fileRefImage = ref(storage, `files/${formDataImageText.name}`);

            const [snapshotBlog, snapshotCart] = await Promise.all([
                uploadBytes(fileRefBlog, formData.listingImage),
                uploadBytes(fileRefImageCart, formDataImage),
                uploadBytes(fileRefImage, formDataImageText),
            ]);

            const BgImage = await getDownloadURL(fileRefBlog);
            const BgImageCard = await getDownloadURL(fileRefImageCart);
            const BgImageText = await getDownloadURL(fileRefImage);


            // Send Data TO fierStore
            await addDoc(collection(firestore, 'listBlogsCartSEATTLE'), {
                title: formData.title,
                category: formData.category,
                price: formData.price,
                currency: formData.currency,
                beds: formData.beds,
                baths: formData.baths,
                square: formData.square,
                parking: formData.parking,
                location: formData.location,
                monthlyPayment: formData.monthlyPayment,
                listingName: formData.listingName,
                stars: formData.stars,
                email: formData.email,
                map: formData.map,
                bgImage: BgImage,
                text: formData.text,
                imageCart: BgImageCard,
                imageText: BgImageText,
                imageSlider: uploadedFileURLs,
                type: formData.type,
                size: formData.size,
                payment: formData.payment,
                mainTitle: formData.mainTitle,
                handover: formData.handover,
                starting: formData.starting,
                CategoryPlan: formData.CategoryPlan,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });

            toast.success('Data submitted successfully!');
            setFormData({
                title: '',
                text: '',
                price: '',
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
                imageCart: null
            });
            Navigate('/dashboard/SeattleProject')
        } catch (err) {
            toast.error('Error submitting data: ' + err.message);
            console.error('Error submitting data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get Data Category
    const getCategories = async () => {

        // Get Data Category
        try {
            const querySnapshot = await getDocs(collection(firestore, "category"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategories(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }

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

        // get category Developers  
        try {
            const querySnapshot = await getDocs(collection(firestore, "CategoryDevelopers"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategoryDevelopers(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }

        // get category buy Plans  
        try {
            const querySnapshot = await getDocs(collection(firestore, "categoryBuyPlan"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCategoryPlan(docs);
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
                        <label htmlFor="me" style={{ fontSize: '30px' }}>
                            Image Cart text
                        </label>
                        <input id="me" type="file" name="imageText" onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0])
                            setImgeCartText(file)
                            setformDataImageText(e.target.files[0])
                        }} />
                        <div className="img">
                            {ImgeCartText && <img
                                src={ImgeCartText}
                                alt="ImgeCartText"
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
                            name="type"
                            placeholder="type"
                            value={formData.type}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="size"
                            placeholder="size"
                            value={formData.size}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="payment"
                            placeholder="payment"
                            value={formData.payment}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="handover"
                            placeholder="handover"
                            value={formData.handover}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="starting"
                            placeholder="starting"
                            value={formData.starting}
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
                            placeholder="parking"
                            maxLength="50"
                            value={formData.parking}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            maxLength="50"
                            value={formData?.name?.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <h1>Landing Page</h1>
                    <div className="form-group">
                        <label htmlFor="slider" style={{ fontSize: '30px' }}>
                            Image Slider
                        </label>
                        <input id="slider" type="file" name="sliderImages" multiple onChange={(e) => {
                            setFileURLs(Array.from(e.target.files));
                            const files = Array.from(e.target.files);
                            setFileImages(files);
                        }} />

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
                        <label htmlFor="me" style={{ fontSize: '30px' }}>
                            Image Listing By
                        </label>
                        <input id="me" type="file" name="listingImage" onChange={handleFileChange} />
                        <div className="img">
                            {urlImge && <img
                                src={urlImge}
                                alt="listingImage"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            />}
                        </div>
                    </div>
                    <div className="form-group">
                        <select style={{ margin: '20px', width: '80%' }} name="category" onChange={(e) => {
                            setFormData({ ...formData, category: e.target.value });
                        }}>
                            <option hidden >Select Category</option>
                            {Categories.map((it) => {
                                return <option key={it.id} value={it.name}>{it.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <select style={{ margin: '20px', width: '80%' }} name="category" onChange={(e) => {
                            setFormData({ ...formData, CategoryPlan: e.target.value });
                        }}>
                            <option hidden >Select Category Buy Plan</option>
                            {CategoryPlan.map((it) => {
                                return <option key={it.id} value={it.name}>{it.name}</option>
                            })}
                        </select>
                    </div>
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
        </div>
    );
}
