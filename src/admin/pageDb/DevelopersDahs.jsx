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

export default function DevelopersDahs() {
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
    const [dataCart, setDataCart] = useState([])


    // Handle Delete Item
    const handleDelete = async (id) => {
        setLoading(true);
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await deleteDoc(doc(firestore, 'CategoryDevelopers', id));
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

    // Handle Delete Item
    const handleDeletCart = async (id) => {
        setLoading(true);
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await deleteDoc(doc(firestore, 'listCartDevelopers', id));
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
            const querySnapshot = await getDocs(collection(firestore, "CategoryDevelopers"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }

        try {
            const querySnapshot = await getDocs(collection(firestore, "listCartDevelopers"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setDataCart(docs);
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
                    Navigate('/dashboard/Developers/AddDevelopers')
                }}>
                    Add Developers
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
                    Navigate('/dashboard/Developers/AddCartDevelopers')
                }}>
                    Add Cart Developer
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
                    Navigate('/dashboard/Developers/AddBannerDevelopers')
                }}>
                    Add Banner Developers
                </button>
            </div>

            <div style={{
                marginTop: '20px'
            }} className="title">
                <h4>Show Category Developers</h4>
            </div>

            <div className="table">
                {data.length > 0 ? <TableContainer component={Paper} sx={{ mt: '30px' }}>
                    <Table sx={{ minWidth: 900 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell width={200} align='center'>image</StyledTableCell>
                                <StyledTableCell width={200} align="center">Title</StyledTableCell>
                                <StyledTableCell width={150} align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((it) => (
                                <StyledTableRow key={it.id}>

                                    <StyledTableCell align="center">
                                        <img style={{ width: '200px' }} src={it.image} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{it.name}</StyledTableCell>
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
                        Navigate('/dashboard/Developers/AddDevelopers')
                    }}>Add New Data</button>
                </p>}
            </div>

            <div className="title">
                <h4>Show Cart Developers</h4>
            </div>
            <div className="table">
                {dataCart.length > 0 ? <TableContainer component={Paper} sx={{ mt: '30px' }}>
                    <Table sx={{ minWidth: 900 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell width={200} align='center'>image</StyledTableCell>
                                <StyledTableCell width={200} align="center">Title</StyledTableCell>
                                <StyledTableCell width={200} align="center">company</StyledTableCell>
                                <StyledTableCell width={200} align="center">Location</StyledTableCell>
                                <StyledTableCell width={150} align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataCart.map((it) => (
                                <StyledTableRow key={it.id}>

                                    <StyledTableCell align="center">
                                        <img style={{ width: '200px' }} src={it.imageCart} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{it.title}</StyledTableCell>
                                    <StyledTableCell align="center">{it.company}</StyledTableCell>
                                    <StyledTableCell align="center">{it.location}</StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => {
                                        handleDeletCart(it.id)
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
                        Navigate('/dashboard/Developers/AddCartDevelopers')
                    }}>Add New Data</button>
                </p>}
            </div>
        </>
    );
}
