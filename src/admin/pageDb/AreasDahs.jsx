import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // استيراد الأنماط الافتراضية لـ Quill.js
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
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


export default function AreasDahs() {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    // Handle Delete Item
    const handleDelete = async (id) => {
        setLoading(true);
        if (window.confirm('Are you sure you want to delete')) {
            try {
                await deleteDoc(doc(firestore, 'listBlogsCartAreas', id));
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
            const querySnapshot = await getDocs(collection(firestore, "listBlogsCartAreas"));
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
                    Navigate('/dashboard/CreateAreas')
                }}>
                    Add Cart Areas
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
                                <StyledTableCell width={200} align="center">Location</StyledTableCell>
                                <StyledTableCell width={200} align="center">Center</StyledTableCell>
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
                                    <StyledTableCell align="center">{it.CateBuyLocation.location}</StyledTableCell>
                                    <StyledTableCell align="center">{it.CateBuyLocation.center}</StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => {
                                        Navigate(`/dashboard/EditAreas/${it.id}`)
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
                        Navigate('/dashboard/CreateAreas')
                    }}>Add New Data</button>
                </p>}
            </div>
        </>
    );
}
