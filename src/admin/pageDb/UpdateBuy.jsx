import React, { useEffect, useState } from 'react';
import { getFirestore, collection, updateDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CloudDone } from '@mui/icons-material';

export default function UpdateBuy() {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [FileURLs, setFileURLs] = useState([]);
    const [FileImage, setFileImages] = useState([]);
    const [urlImge, seturlImge] = useState(null);
    const [ImgeCart, setImgeCart] = useState(null);
    const [Categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDataImage, setformDataImage] = useState('');
    const [formClintImage, setformClintImage] = useState('');
    const [CategoryBuyLocation, setCategoryBuyLocation] = useState([]);
    const [CategoryDevelopers, setCategoryDevelopers] = useState([]);
    const [CategoryPlan, setCategoryPlan] = useState([]);
    const [formData, setFormData] = useState({});
    const [CateBuyLocation, setCateBuyLocation] = useState({});
    const [formDataImageText, setformDataImageText] = useState('');
    const [ImgeCartText, setImgeCartText] = useState('');
    const [Centers, setCenters] = useState([]);
    const [CategoryLocation, setCategoryLocation] = useState({});
    const [plan, setPlan] = useState('')

    const [CategoryBuyPlan, setCategoryBuyPlan] = useState([
        { BuyPlan: '' },
        { BuyPlan: '' },
        { BuyPlan: '' },
    ]);

    const handleCategoryChange = (index, value) => {
        const updatedPlans = [...CategoryBuyPlan];
        updatedPlans[index].BuyPlan = value;
        setCategoryBuyPlan(updatedPlans);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

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
            let updatedBlogImageCart = formData.imageCart;
            let updatedBlogClint = formData.bgImage;
            let updatedCartImageSlider = formData.imageSlider;
            let updatedBlogImageText = formData.imageText;


            if (FileURLs.length > 0) {
                const uploadedFileURLs = await Promise.all(FileURLs.map(async (file) => {
                    const fileRef = ref(storage, `files/${file.name}`);
                    await uploadBytes(fileRef, file);
                    return await getDownloadURL(fileRef);
                }));
                updatedCartImageSlider = uploadedFileURLs;
            }

            if (formDataImage) {
                const fileRefImage = ref(storage, `filesBlog/${formDataImage.name}`);
                await uploadBytes(fileRefImage, formDataImage);
                updatedBlogImageCart = await getDownloadURL(fileRefImage);
            }

            if (formClintImage) {
                const fileRefCart = ref(storage, `filesBlog/${formClintImage.name}`);
                await uploadBytes(fileRefCart, formClintImage);
                updatedBlogClint = await getDownloadURL(fileRefCart);
            }

            if (formDataImageText) {
                const fileRefCart = ref(storage, `filesBlog/${formDataImageText.name}`);
                await uploadBytes(fileRefCart, formDataImageText);
                updatedBlogImageText = await getDownloadURL(fileRefCart);
            }

            const docRef = doc(firestore, 'listBlogsCartBuy', id);
            await updateDoc(docRef, {
                title: formData.title,
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
                imageText: updatedBlogImageText,
                listingImage: updatedBlogClint,
                text: formData.text,
                imageCart: updatedBlogImageCart,
                imageSlider: updatedCartImageSlider,
                CateBuyLocation: {
                    location: CategoryLocation.location || formData.CateBuyLocation.location,
                    center: CategoryLocation.center || formData.CateBuyLocation.location,
                },
                plan: formData.Plan || plan,
                type: formData.type,
                starting: formData.starting,
                size: formData.size,
                handover: formData.handover,
                payment: formData.payment,

                mainTitle: formData.mainTitle,
                CategoryDevelopers: formData.CategoryDevelopers,
                CategoryBuyPlan,
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            });
            toast.success('Data updated successfully!');
            console.log('Data updated successfully!');

            Navigate('/dashboard/buy');
        } catch (err) {
            toast.error('Error updating data: ' + err.message);
            console.error('Error updating data:', err.message);
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

    const fetchData = async () => {
        try {
            const docRef = doc(firestore, 'listBlogsCartBuy', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setFormData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document: ", error);
        }
    };

    useEffect(() => {
        getCategories();
        fetchData();
    }, [id]);

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
                    <h1>Update Cards</h1>
                    <div className="form-group">
                        <label htmlFor="me" style={{ fontSize: '30px' }}>
                            Image Cart
                        </label>
                        <input id="me" type="file" name="listingImage" onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0]);
                            setImgeCart(file);
                            setformDataImage(e.target.files[0]);
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
                        <label htmlFor="me" style={{ fontSize: '30px' }}>
                            Image Cart text
                        </label>
                        <input id="me" type="file" name="imageText" onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0])
                            setImgeCartText(file)
                            setformDataImageText(e.target.files[0])
                        }} />
                        <div className="img">
                            {ImgeCartText ? <img
                                src={ImgeCartText}
                                alt="ImageCart"
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                            /> : formData.imageText && <img
                                src={formData.imageText}
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
                    <div className="form-group">
                        <input
                            type="text"
                            name="mainTitle"
                            placeholder="Enter Your main Title"
                            value={formData.mainTitle}
                            onChange={handleInputChange}
                        />
                    </div>

                    {formData.plan === 'Off-plan' && <div className="form-group">
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
                </div>}

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
                            name="beds"
                            placeholder="Beds"
                            value={formData.beds}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="baths"
                            placeholder="Baths"
                            value={formData.baths}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
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
                    </div>
                    <div className="form-group">
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
                            {FileImage && FileImage.map((it, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(it)}
                                    alt={`preview-${index}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                />
                            ))}
                            {formData?.imageSlider?.map((it, index) => (
                                <img
                                    key={index}
                                    src={it}
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
                            value={formData.monthlyPayment}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="listingName"
                            placeholder="Listing Name"
                            value={formData.listingName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="stars"
                            placeholder="Stars"
                            value={formData.stars}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
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
                        <input id="me" type="file" name="listingImage" onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0]);
                            seturlImge(file);
                            setformClintImage(e.target.files[0]);
                        }} />
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

                        <select
                            style={{ margin: '20px', width: '80%' }}
                            name="location"
                            value={CateBuyLocation.location}
                            onChange={(e) => {
                                setCateBuyLocation({ ...CateBuyLocation, location: e.target.value, center: '' });
                                setCategoryLocation({ ...CategoryLocation, location: e.target.value });
                            }}
                        >
                            <option hidden>Select Category Location</option>
                            {CategoryBuyLocation.map((it) => (
                                <option key={it.id} value={it.location}>{it.location}</option>
                            ))}
                        </select>
                        {CateBuyLocation.location ? <p>{CateBuyLocation.location}</p> : <p>{formData?.CateBuyLocation?.location}</p>}


                        {Centers.length > 0 && (
                            <select
                                style={{ margin: '20px', width: '80%' }}
                                name="center"
                                value={CateBuyLocation.center}
                                onChange={(e) => {
                                    setCateBuyLocation({ ...CateBuyLocation, center: e.target.value });
                                    setCategoryLocation({ ...CategoryLocation, center: e.target.value });
                                }}
                            >
                                <option hidden>Select Center</option>
                                {Centers.map((center, index) => (
                                    <option key={index} value={center.name}>{center.name}</option>
                                ))}
                            </select>
                        )}
                        {CateBuyLocation.center ? <p>{CateBuyLocation.center}</p> : <p>{formData?.CateBuyLocation?.center}</p>}

                    </div>
                    <div className="form-group">
                        <select style={{ margin: '20px', width: '80%' }} name="category" onChange={(e) => {
                            setFormData({ ...formData, CategoryDevelopers: e.target.value });
                        }}>
                            <option hidden >Select Category Developers</option>
                            {CategoryDevelopers.map((it) => {
                                return <option key={it.id} value={it.name}>{it.name}</option>
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <select style={{ margin: '20px', width: '80%' }} name="category" onChange={(e) => {
                            setPlan(e.target.value);
                        }}>
                            <option hidden >Select the Plan type</option>
                            <option value={'Secondary properties'}>Secondary properties</option>
                            <option value={'Off-plan'}>Off-plan</option>
                        </select>
                    </div>

                    {CategoryBuyPlan.map((plan, index) => (
                        <div className="form-group" key={index}>
                            <select
                                style={{ margin: '20px', width: '80%' }}
                                name={`BuyPlan${index + 1}`}
                                value={plan.BuyPlan}
                                onChange={(e) => handleCategoryChange(index, e.target.value)}
                            >
                                <option hidden>Select Buy Plan {index + 1}</option>
                                {CategoryPlan.map((it) => (
                                    <option key={it.id} value={it.name}>
                                        {it.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {formData?.CategoryBuyPlan?.map((item) => {
                        return <p key={item.id}>{item.BuyPlan}</p>
                    })}

                    <div className="form-group">
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.text || ""}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setFormData(prevFormData => ({
                                    ...prevFormData,
                                    text: data
                                }));
                            }}
                            config={{
                                height: '400px',
                            }}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
}
