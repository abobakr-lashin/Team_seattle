import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebaseConfig'; // تأكد من أن مسار الاستيراد صحيح
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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

export default function BuyDahs() {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formDataImage, setformDataImage] = useState('')
    const [data, setData] = useState([])
    const [CategoryBuyLocation, setCategoryBuyLocation] = useState([])
    const [CategoryDevelopers, setCategoryDevelopers] = useState([])
    const [CategoryPlan, setCategoryPlan] = useState([])
    const [dataBuyPlan , setDataBuyPlan] = useState([])
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


    // Handle Delete Item
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await deleteDoc(doc(firestore, 'listBlogsCartBuy', id));
                console.log('Document successfully deleted!');
                getCategories();
                toast.success('Document successfully deleted')
            } catch (error) {
                console.error('Error deleting document: ', error);
            }
        }
    };

        // Handle Delete Item Category
        const handleDeleteCategory = async (id) => {
            if (window.confirm('Are you sure you want to delete')) {
                try {
                    await deleteDoc(doc(firestore, 'categoryBuyPlan', id));
                    console.log('Document successfully deleted!');
                    getCategories();
                    toast.success('Document successfully deleted')
                } catch (error) {
                    console.error('Error deleting document: ', error);
                }
            }
        };


    // Get Data Cart Firebase
    const getCategories = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartBuy"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }

        try {
            const querySnapshot = await getDocs(collection(firestore, "categoryBuyPlan"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDataBuyPlan(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
            setError(error);
            setLoading(false);
        } finally {
            setLoading(false);
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
                    Navigate('/dashboard/AddCardBuy')
                }}>
                    Add Cart Buy
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
                    Navigate('/dashboard/AddCateBuyPlan')
                }}>
                    Add Category Buy
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
                    Navigate('/dashboard/buy/AddBannerBuy')
                }}>
                    Add Banner Buy
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
                                    <StyledTableCell align="center">{it.text.slice(0, 30)}...</StyledTableCell>
                                    <StyledTableCell align="center">{it.price}</StyledTableCell>
                                    <StyledTableCell align="center">{it.category.location}</StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => {
                                        Navigate(`/dashboard/EditBuy/${it.id}`)
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
                        Navigate('/dashboard/AddCardBuy')
                    }}>Add New Data</button>
                </p>}
            </div>
            <div className="table">
                <h3>Category Buy Plan</h3>
                {dataBuyPlan.length > 0 ? <TableContainer component={Paper} sx={{ mt: '30px' }}>
                    <Table sx={{ minWidth: 900 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell width={200} align='center'>name</StyledTableCell>
                                <StyledTableCell width={200} align="center">Category Plan</StyledTableCell>
                                <StyledTableCell width={150} align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataBuyPlan.map((it) => (
                                <StyledTableRow key={it.id}>
                                    <StyledTableCell align="center">{it.name}</StyledTableCell>
                                    <StyledTableCell align="center">{it.CategoryPlan}</StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => {
                                        handleDeleteCategory(it.id)
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
                        Navigate('/dashboard/AddCateBuyPlan')
                    }}>Add New Data</button>
                </p>}
            </div>
        </>
    );
}
