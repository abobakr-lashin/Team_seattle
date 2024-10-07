import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Stack, CircularProgress } from '@mui/material';
import { firestore } from '../../firebaseConfig';
import { addDoc, collection, getDocs, where, updateDoc, doc, query, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom'; // استخدام useParams لجلب معرّف الفئة

const UpdateLocation = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // الحصول على معرف الفئة من الـ URL إذا كان موجوداً
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        location: '',
        centers: [{ name: '', address: '' }],
    });
    const [error, setError] = useState(null);

    // Check id
    useEffect(() => {
        const fetchCategory = async () => {
            if (id) {
                setLoading(true);
                const docRef = doc(firestore, 'CategoryBuyLocation', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCategory(docSnap.data()); // Get Data
                } else {
                    toast.error('Category not found');
                }
                setLoading(false);
            }
        };
        fetchCategory();
    }, [id]);

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

    // Delete Center
    const handleDeleteCenter = (index) => {
        const newCenters = category.centers.filter((_, i) => i !== index);
        setCategory({ ...category, centers: newCenters });
    };

    const handleAddOrUpdateCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const categoriesRef = collection(firestore, 'CategoryBuyLocation');

            if (id) {
                // If we are updating, update the document
                const docRef = doc(firestore, 'CategoryBuyLocation', id);
                await updateDoc(docRef, {
                    location: category.location,
                    centers: category.centers,
                    updatedAt: new Date(),
                });
                toast.success('Category updated successfully!');
            } else {
                // If we are adding a new category
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
            }

            setCategory({ location: '', centers: [{ name: '', address: '' }] });
            navigate('/dashboard/Areas');
        } catch (err) {
            setError('Error adding or updating category: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {id ? 'Update' : 'Add'} Category by Location
            </Typography>

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

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteCenter(index)}
                        sx={{ mt: 1 }}
                    >
                        Delete Center
                    </Button>
                </Box>
            ))}

            <Button variant="outlined" onClick={handleAddCenter} sx={{ mb: 2 }}>
                Add Another Center
            </Button>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                {loading ? (
                    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress size={20} />
                        <Typography variant="body2">{id ? 'Updating' : 'Adding'} Category...</Typography>
                    </Stack>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAddOrUpdateCategory}
                        sx={{ mb: 2 }}
                    >
                        {id ? 'Update' : 'Add'} Category
                    </Button>
                )}
            </Box>

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </Box>
    );
};

export default UpdateLocation;
