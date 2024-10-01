import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Stack, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { firestore, storage } from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const AddCateBuyLocation = () => {
    const Navigste = useNavigate()
    const [FileImage, setFileImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [fileUrl, setfileUrl] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        location: '',
        center: '',
    });



    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Cheake Category 
            const categoriesRef = collection(firestore, 'CategoryBuyLocation');
            // const q = query(categoriesRef, where('name', '==', category));
            // const querySnapshot = await getDocs(q);

            // if (querySnapshot.empty) {
            await addDoc(categoriesRef, {
                createdAt: new Date(),
                category
            });
            toast.success('Category added successfully!.')
            setCategory('');
            Navigste('/dashboard/Developers')
            return
            // } else {
            //     toast.error('Category already exists!');
            // }
        } catch (err) {
            setError('Error adding category: ' + err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Add Category buy Location</Typography>

            <TextField
                label="Category"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                    setCategory({ ...category, location: e.target.value });
                }}
                sx={{ mb: 2 }}
            />

            <TextField
                label="center Location"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                    setCategory({ ...category, center: e.target.value });
                }}
                sx={{ mb: 2 }}
            />



            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                {loading ? (
                    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress size={20} />
                        <Typography variant="body2">Adding Category...</Typography>
                    </Stack>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAddCategory}
                        sx={{ mb: 2 }}
                    >
                        Add Category
                    </Button>
                )}
            </Box>

        </Box>
    );
};

export default AddCateBuyLocation;
