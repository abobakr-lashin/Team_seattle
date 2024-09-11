import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد الأنماط الافتراضية لـ Quill.js
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig'; // تأكد من أن مسار الاستيراد صحيح
import { toast } from 'react-toastify';

export default function CommercialCreate() {
    const [FileURLs, setFileURLs] = useState([])
    const [FileImage, setFileImages] = useState([])
    const [urlImge, setUrlImge] = useState(null)
    const [Categories , setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        text: '',
        price: '',
        beds: '',
        baths: '',
        square: '',
        qualities: '',
        location: '',
        monthlyPayment: '',
        listingName: '',
        stars: '',
        email: '',
        map: '',
        category: '',
        listingImage: null
    });

    console.log(Categories);



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

    const handleQuillChange = (value) => {
        setFormData({
            ...formData,
            text: value,
        });
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
            const [snapshotBlog, snapshotCart] = await Promise.all([
                uploadBytes(fileRefBlog, formData.listingImage),
            ]);

            const BgImage = await getDownloadURL(fileRefBlog);
            // Send Data TO fierStore
            await addDoc(collection(firestore, 'listingsBlogs'), {
                category: '',
                price: formData.price,
                beds: formData.beds,
                baths: formData.baths,
                square: formData.square,
                qualities: formData.qualities,
                location: formData.location,
                monthlyPayment: formData.monthlyPayment,
                listingName: formData.listingName,
                stars: formData.stars,
                email: formData.email,
                map: formData.map,
                bgImage: BgImage,
                text: formData.text,
                imageSlider: uploadedFileURLs,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });

            toast.success('Data submitted successfully!');
            setFormData({
                text: '',
                price: '',
                beds: '',
                baths: '',
                square: '',
                qualities: '',
                location: '',
                monthlyPayment: '',
                listingName: '',
                stars: '',
                email: '',
                map: '',
                category: '',
                listingImage: null
            });
        } catch (err) {
            toast.error('Error submitting data: ' + err.message);
            console.error('Error submitting data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get Data Category
    const getCategories = async () => {
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
    };

    useEffect(() => {
        getCategories();
    }, []);

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
        ]
    };

    return (
        <div>
            <div>
                <form className="cardcreat" onSubmit={handleSubmit}>
                    <h1>Create Cards</h1>
                    <div className="form-group">
                        <input
                            type="number"
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
                            name="qualities"
                            placeholder="Qualities"
                            maxLength="50"
                            value={formData.qualities}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            maxLength="50"
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
                            type="number"
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
                        <select style={{ margin: '20px', width: '80%' }} name="category" value={formData.category} onChange={(e)=>{
                            setFormData({...formData, category: e.target.value });
                        }}>
                            <option hidden >Select Category</option>
                            {Categories.map((it)=>{
                                return <option key={it.id} value={it.name}>{it.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <ReactQuill
                            theme="snow"
                            value={formData.text}
                            onChange={handleQuillChange}
                            modules={modules}
                            placeholder="Enter detailed description here..."
                            style={{ height: '300px', width: '100%', padding: "10px", whiteSpace: "pre-wrap" }}
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
