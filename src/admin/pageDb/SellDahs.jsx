import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد الأنماط الافتراضية لـ Quill.js
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig'; // تأكد من أن مسار الاستيراد صحيح
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export default function SellDahs() {
    const Navigate = useNavigate()
    const [FileURLs, setFileURLs] = useState([])
    const [FileImage, setFileImages] = useState([])
    const [urlImge, setUrlImge] = useState(null)
    const [ImgeCart, setImgeCart] = useState(null)
    const [Categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDataImage, setformDataImage] = useState('')
    const [data, setData] = useState([])
    const [CategoryBuyLocation, setCategoryBuyLocation] = useState([])
    const [CategoryDevelopers, setCategoryDevelopers] = useState([])
    const [CategoryPlan, setCategoryPlan] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        text: '',
        price: '',
        currency: '',
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
        listingImage: null,
        CategoryBuyLocation: '',
        CategoryDevelopers: '',
        CategoryPlan: '',
    });

    console.log(formDataImage);



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
            const fileRefImageCart = ref(storage, `filesBlog/${formDataImage.name}`);

            const [snapshotBlog, snapshotCart] = await Promise.all([
                uploadBytes(fileRefBlog, formData.listingImage),
                uploadBytes(fileRefImageCart, formDataImage),
            ]);

            const BgImage = await getDownloadURL(fileRefBlog);
            const BgImageCard = await getDownloadURL(fileRefImageCart);


            // Send Data TO fierStore
            await addDoc(collection(firestore, 'listBlogsCartRent'), {
                title: formData.title,
                category: formData.category,
                price: formData.price,
                currency: formData.currency,
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
                imageCart: BgImageCard,
                imageSlider: uploadedFileURLs,
                CategoryBuyLocation: formData.CategoryBuyLocation,
                CategoryDevelopers: formData.CategoryDevelopers,
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
                qualities: '',
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
            Navigate('/dashboard')
        } catch (err) {
            toast.error('Error submitting data: ' + err.message);
            console.error('Error submitting data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Get Data Cart Firebase
    const getCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartSell"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(docs);
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

    console.log(CategoryBuyLocation, CategoryDevelopers, CategoryPlan);

    return (
        <>
            <div className="rent" style={{
                display: 'flex',
                textAlign: 'start',
                marginTop: '20px',
                gap: '10px',
            }}>
                <button style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    border: '1px solid #ccc',
                    padding: '8px',
                    color: '#234232',
                }} onClick={() => {
                    Navigate('/dashboard/CreateRent')
                }}>
                    Add Cart Rent
                </button>
                <button style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    border: '1px solid #ccc',
                    padding: '8px',
                    color: '#234232',
                }} onClick={() => {
                    Navigate('/dashboard/AddCategoryRentPlan')
                }}>
                    Add Category Rent
                </button>
                <button style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    outline: 'none',
                    border: '1px solid #ccc',
                    padding: '8px',
                    color: '#234232',
                }} onClick={() => {
                    Navigate('/dashboard/AddLocationRent')
                }}>
                    Add Category Location
                </button>
            </div>
            <div className="table">
                <TableContainer component={Paper} sx={{ mt: '30px' }}>
                    <Table sx={{ minWidth: 900 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell width={200} align='center'>image</StyledTableCell>
                                <StyledTableCell width={200} align="center">Title</StyledTableCell>
                                <StyledTableCell width={200} align="center">Description</StyledTableCell>
                                <StyledTableCell align="center">Price</StyledTableCell>
                                <StyledTableCell align="center">Location</StyledTableCell>
                                <StyledTableCell width={150} align="center">Update</StyledTableCell>
                                <StyledTableCell width={150} align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((it) => (
                                <StyledTableRow key={it.id}>
                                    <StyledTableCell>
                                        <img style={{ width: '200px' }} src={it.imageCart} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{it.title}</StyledTableCell>
                                    <StyledTableCell align="center">{it.text.slice(0, 30)}...</StyledTableCell>
                                    <StyledTableCell align="center">{it.price}</StyledTableCell>
                                    <StyledTableCell align="center">{it.location}</StyledTableCell>
                                    <StyledTableCell align="center"><button style={{ backgroundColor: '#1976d2' }}>Update</button></StyledTableCell>
                                    <StyledTableCell align="center"><button style={{ backgroundColor: 'red' }}>Delete</button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
