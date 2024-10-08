import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stack, CircularProgress } from '@mui/material';
import { firestore } from '../../firebaseConfig';
import { addDoc, collection, getDocs, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { query } from 'firebase/database';

const AddCateBuyLocation = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        location: '',
        centers: [{ name: '', address: '' }],
    });
    const [error, setError] = useState(null);

    // Add Center
    const handleAddCenter = () => {
        setCategory({
            ...category,
            centers: [...category.centers, { name: '', address: '' }]
        });
    };

    // Update Center
    const handleCenterChange = (index, field, value) => {
        const newCenters = category.centers.map((center, i) =>
            i === index ? { ...center, [field]: value } : center
        );
        setCategory({ ...category, centers: newCenters });
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const categoriesRef = collection(firestore, 'CategoryBuyLocation');
            const q = query(categoriesRef, where('location', '==', category.location));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                toast.error('Category already exists!');
                return;
            }

            await addDoc(categoriesRef, {
                createdAt: new Date(),
                location: category.location,
                centers: category.centers,
            });

            toast.success('Category added successfully!');
            setCategory({ location: '', centers: [{ name: '', address: '' }] });
            navigate('/dashboard/Areas');
        } catch (err) {
            setError('Error adding category: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Add Category by Location</Typography>

            <TextField
                label="Location"
                variant="outlined"
                fullWidth
                value={category.location}
                onChange={(e) => setCategory({ ...category, location: e.target.value })}
                sx={{ mb: 2 }}
            />

            {category.centers.map((center, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">Center {index + 1}</Typography>

                    <TextField
                        label="Center Name"
                        variant="outlined"
                        fullWidth
                        value={center.name}
                        onChange={(e) => handleCenterChange(index, 'name', e.target.value)}
                        sx={{ mb: 1 }}
                    />

                    <TextField
                        label="Center Address"
                        variant="outlined"
                        fullWidth
                        value={center.address}
                        onChange={(e) => handleCenterChange(index, 'address', e.target.value)}
                    />
                </Box>
            ))}

            <Button variant="outlined" onClick={handleAddCenter} sx={{ mb: 2 }}>
                Add Another Center
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

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
};

export default AddCateBuyLocation;
