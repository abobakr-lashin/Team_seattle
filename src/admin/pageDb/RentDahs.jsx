import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد الأنماط الافتراضية لـ Quill.js
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig'; // تأكد من أن مسار الاستيراد صحيح
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
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

export default function RentDahs() {
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

    // Handle Delete Item
    const handleDelete = async (id) => {
        setLoading(true);
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await deleteDoc(doc(firestore, 'listBlogsCartRent', id));
                console.log('Document successfully deleted!');
                getCategories();
                toast.success('Document successfully deleted')
            } catch (error) {
                console.error('Error deleting document: ', error);
                toast.error('Error deleting document')
                setLoading(false);
            } finally {
                setLoading(false);
            }
        }
    };

    // Get Data Cart Firebase
    const getCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartRent"));
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


    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }



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
                    Navigate('/dashboard/AddCategoryBuyLocation')
                }}>
                    Add Category Location
                </button>
            </div>
            <div className="table">
                {data.length > 0 ? <TableContainer component={Paper} sx={{ mt: '30px' }}>
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
                                    <StyledTableCell align="center">{it?.text?.slice(0, 30)}...</StyledTableCell>
                                    <StyledTableCell align="center">{it.price}</StyledTableCell>
                                    <StyledTableCell align="center">{it?.location}</StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => {
                                        Navigate(`/dashboard/EditRent/${it.id}`)
                                    }} style={{ backgroundColor: '#1976d2' }}>Update</button></StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => {
                                        handleDelete(it.id)
                                    }} style={{ backgroundColor: 'red' }}>Delete</button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> : <p style={{
                    marginTop: '60px',
                    fontSize: '20px',
                    textAlign: 'center',
                    color: '#234232',
                    fontWeight: 'bold'
                }}>
                    There is no data in the data base <button style={{
                        color: '#1976d2',
                        textDecoration: 'underline',
                        display: 'inline-block'
                    }} onClick={() => {
                        Navigate('/dashboard/CreateRent')
                    }}>Add New Data</button>
                </p>}
            </div>
        </>
    );
}
