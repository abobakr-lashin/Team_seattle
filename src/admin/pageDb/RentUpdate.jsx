import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { doc, getDoc, updateDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

export default function RentUpdate() {
    const { id } = useParams();
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
        CategoryBuyLocation: '',
        CategoryDevelopers: '',
        CategoryPlan: '',
    });

    // get Data Cart 
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const db = getFirestore();
                const docRef = doc(db, 'listBlogsCartRent', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log('Error fetching document:', error.message);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
    }, [id]);



    //update the document
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // handle input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setUrlImge(URL.createObjectURL(e.target.files[0]));

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

    const handleQuillChange = (value) => {
        setFormData({
            ...formData,
            text: value,
        });
    };

    // update the form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // upload file
            const uploadedFileURLs = await Promise.all(FileURLs.map(async (file) => {
                const fileRef = ref(storage, `files/${file.name}`);
                await uploadBytes(fileRef, file);
                return await getDownloadURL(fileRef);
            }));

            const fileRefBlog = ref(storage, `filesBlog/${formData.listingImage.name}`);
            const fileRefImageCart = ref(storage, `filesBlog/${formDataImage.name}`);

            const [snapshotBlog, snapshotCart] = await Promise.all([
                uploadBytes(fileRefBlog, formData.listingImage),
                uploadBytes(fileRefImageCart, formDataImage),
            ]);

            const BgImage = await getDownloadURL(fileRefBlog);
            const BgImageCard = await getDownloadURL(fileRefImageCart);


            const docRef = doc(firestore, 'listBlogsCartRent', id);
            await updateDoc(docRef, {
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
                imageSlider: uploadedFileURLs,
                CategoryBuyLocation: formData.CategoryBuyLocation,
                CategoryDevelopers: formData.CategoryDevelopers,
                CategoryPlan: formData.CategoryPlan,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString(),
            });

            toast.success('Data updated successfully!');
            navigate('/dashboard/Rent');
        } catch (err) {
            toast.error('Error updating data: ' + err.message);
            console.error('Error updating data:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCategories = async () => {

    };

    useEffect(() => {
        getCategories();
    }, []);

    // console.log(formData.imageSlider);

    return (
        <div>
            <form className="cardcreat" onSubmit={handleSubmit}>
                <h1>Update Card</h1>
                <div className="form-group">
                    <label htmlFor="me" style={{ fontSize: '30px' }}>
                        Image Cart
                    </label>
                    <input id="me" type="file" name="listingImage" onChange={(e) => {
                        const file = URL.createObjectURL(e.target.files[0])
                        setImgeCart(file)
                        setFormDataImage(e.target.files[0])
                    }} />
                    <div className="img">
                        {ImgeCart ? <img
                            src={ImgeCart}
                            alt="ImageCart"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        /> : formData.imageCart && <img
                            src={formData.imageCart}
                            alt="ImageCart"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />}
                    </div>
                </div>
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
                        name="currency"
                        placeholder="Currency"
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
                        placeholder="Beds"
                        value={formData.beds}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="baths"
                        placeholder="Baths"
                        value={formData.baths}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="square"
                        placeholder="Square"
                        value={formData.square}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="parking"
                        placeholder="Parking"
                        value={formData.parking}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
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
                        {formData.imageSlider.length > 0 ?
                            formData.imageSlider.map((it, index) => (
                                <img
                                    key={index}
                                    src={it}
                                    alt={`preview-${index}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                />
                            )) :
                            (FileImage.length > FileImage.map((it, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(it)}
                                    alt={`preview-${index}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                />
                            )))}
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
                        {urlImge ? <img
                            src={urlImge}
                            alt="listingImage"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        /> : formData.bgImage && <img
                            src={formData.bgImage}
                            alt="listingImage"
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />}
                    </div>
                </div>
                <div className="form-group">
                    <ReactQuill
                        theme="snow"
                        value={formData.text}
                        onChange={handleQuillChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
}
