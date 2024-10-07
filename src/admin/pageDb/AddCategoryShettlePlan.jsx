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

const AddCategoryShettlePlan = () => {
    const Navigste = useNavigate()
    const [category, setCategory] = useState('');
    const [FileImage, setFileImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [fileUrl, setfileUrl] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [CategoryPlan, setCategoryPlan] = useState('');

    console.log(FileImage);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!category.trim()) {
            toast.error('Category already exists!');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Cheake Category 
            const categoriesRef = collection(firestore, 'categoryBuyPlan');
            const q = query(categoriesRef, where('category', '==', category));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(categoriesRef, {
                    name: category,
                    CategoryPlan,
                    createdAt: new Date(),
                });
                toast.success('Category added successfully!.')
                setCategory('');
                Navigste('/dashboard/SeattleProject')
                return
            } else {
                toast.error('Category already exists!');
            }
        } catch (err) {
            setError('Error adding category: ' + err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Add Category Buy Plan</Typography>

            <TextField
                label="Category"
                variant="outlined"
                fullWidth
                onChange={(e) => setCategory(e.target.value)}
                sx={{ mb: 2 }}
            />
            <div className="form-group">
                <select style={{ margin: '20px', width: '80%' }} name="category" onChange={(e) => {
                    setCategoryPlan(e.target.value);
                }}>
                    <option hidden >Select Buy Plan</option>
                    <option value={'Secondary properties'}>Secondary properties</option>
                    <option value={'Off-plan'}>Off-plan</option>
                </select>
            </div>

            <List>
                <img style={{ width: '200px' }} src={fileUrl} alt="" />
            </List>

            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImage(file)
                        setfileUrl(URL.createObjectURL(file))
                    }}
                    multiple
                />
            </Button>

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

export default AddCategoryShettlePlan;
