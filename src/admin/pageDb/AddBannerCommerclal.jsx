import React, { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Stack, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { firestore, storage } from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection} from 'firebase/firestore';
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

const AddBannerCommercial = () => {
    const Navigste = useNavigate()
    const [text, setText] = useState('');
    const [FileImage, setFileImage] = useState({
        image1: null,
        image2: null
    });
    const [categories, setCategories] = useState([]);
    const [fileUrl, setfileUrl] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileUr2, setfileUr2] = useState('');

    console.log(FileImage);

    const handleAddCategory = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const imageUrl1 = ref(storage, `fileBanner/Commercial/${FileImage.image1.name}`)
            const taskBanner1 = uploadBytes(imageUrl1, FileImage.image1);

            const imageUrl2 = ref(storage, `fileBanner/Commercial/${FileImage.image2.name}`)
            const taskBanner2 = uploadBytes(imageUrl2, FileImage.image2);


            const [snapshotBlog, snapshotCart] = await Promise.all([
                uploadBytes(imageUrl1, FileImage.image1),
                uploadBytes(imageUrl2, FileImage.image2)
            ]);

            const urlBlog1 = await getDownloadURL(imageUrl1);
            const urlBlog2 = await getDownloadURL(imageUrl2);

            const categoriesRef = collection(firestore, 'bannerCommercial');
            await addDoc(categoriesRef, {
                text,
                imageCommercial1: urlBlog1,
                imageCommercial2: urlBlog2,
                createdAt: new Date(),
            });
            toast.success('Banner added successfully!.')
            setText('');
            Navigste('/dashboard/Commercial')
            return

        } catch (err) {
            setError('Error adding category: ' + err.message);
            console.log('Error adding category: ', err.message);
        } finally {
            setLoading(false);
        }
    };



    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Add Category Buy Plan</Typography>

            <TextField
                label="text Banner"
                variant="outlined"
                fullWidth
                onChange={(e) => setText(e.target.value)}
                sx={{ mb: 2 }}
            />


            <List>
                <img style={{ width: '200px' }} src={fileUrl} alt="a" />
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
                        setFileImage({ ...FileImage, image1: e.target.files[0] })
                        setfileUrl(URL.createObjectURL(file))
                    }}
                    multiple
                />
            </Button>

            <List>
                <img style={{ width: '200px' }} src={fileUr2} alt="a" />
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
                        setFileImage({ ...FileImage, image2: e.target.files[0] })
                        setfileUr2(URL.createObjectURL(file))
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
                        Add Banner
                    </Button>
                )}
            </Box>

        </Box>
    );
};

export default AddBannerCommercial;
