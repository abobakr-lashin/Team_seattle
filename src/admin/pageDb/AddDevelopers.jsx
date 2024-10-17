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

const AddDevelopers = () => {
    const Navigste = useNavigate()
    const [category, setCategory] = useState('');
    const [FileImage, setFileImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [fileUrl, setfileUrl] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [FileImageBanners, setFileImageBanners] = useState({
        bannerCart: null,
        banner1: null,
        banner2: null,
        banner3: null,
        banner4: null,
        banner5: null,
        banner6: null,
    });

    const [UrlImageBanners, setUrlImageBanners] = useState({
        bannerCart: null,
        banner1: null,
        banner2: null,
        banner3: null,
        banner4: null,
        banner5: null,
        banner6: null,
    });

    console.log(FileImageBanners);


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
            const image = ref(storage, `fileImage/${FileImage.name}`)
            await uploadBytes(image, FileImage);
            const downloadUrl = await getDownloadURL(image);


            // Banner Cart
            const BannerCart = ref(storage, `file/Image/banner/${FileImageBanners.bannerCart.name}`)
            await uploadBytes(BannerCart, FileImageBanners.bannerCart);
            const downloadUrlBannerCart = await getDownloadURL(BannerCart);


            // Banner 1
            const Banner1 = ref(storage, `file/Image/${FileImageBanners.banner1.name}`)
            await uploadBytes(Banner1, FileImageBanners.banner1);
            const downloadUrl1 = await getDownloadURL(Banner1);

            // Banner 2
            const Banner2 = ref(storage, `file/Image/${FileImageBanners.banner2.name}`)
            await uploadBytes(Banner2, FileImageBanners.banner2);
            const downloadUrl2 = await getDownloadURL(Banner2);

            // Banner 3
            const Banner3 = ref(storage, `file/Image/${FileImageBanners.banner3.name}`)
            await uploadBytes(Banner3, FileImageBanners.banner3);
            const downloadUrl3 = await getDownloadURL(Banner3);


            // Banner 4
            const Banner4 = ref(storage, `file/Image/${FileImageBanners.banner4.name}`)
            await uploadBytes(Banner4, FileImageBanners.banner4);
            const downloadUrl4 = await getDownloadURL(Banner4);


            // Banner 5
            const Banner5 = ref(storage, `file/Image/${FileImageBanners.banner5.name}`)
            await uploadBytes(Banner5, FileImageBanners.banner5);
            const downloadUrl5 = await getDownloadURL(Banner5);


            // Banner 6
            const Banner6 = ref(storage, `file/Image/${FileImageBanners.banner6.name}`)
            await uploadBytes(Banner6, FileImageBanners.banner6);
            const downloadUrl6 = await getDownloadURL(Banner6);





            const categoriesRef = collection(firestore, 'CategoryDevelopers');
            const q = query(categoriesRef, where('name', '==', category));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(categoriesRef, {
                    name: category,
                    image: downloadUrl,
                    bannerCart: downloadUrlBannerCart,
                    banner1: downloadUrl1,
                    banner2: downloadUrl2,
                    banner3: downloadUrl3,
                    banner4: downloadUrl4,
                    banner5: downloadUrl5,
                    banner6: downloadUrl6,
                    createdAt: new Date(),
                });
                toast.success('Category added successfully!.')
                setCategory('');
                Navigste('/dashboard/Developers')
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
            <Typography variant="h5" sx={{ mb: 2 }}>Add Developers</Typography>
            <TextField
                label="Category"
                variant="outlined"
                fullWidth
                onChange={(e) => setCategory(e.target.value)}
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
                Upload files Cart
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


            {/* Add Banner Company */}

            <br />
            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files Banner
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImageBanners({ ...FileImageBanners, bannerCart: e.target.files[0] })
                        setUrlImageBanners({ ...UrlImageBanners, bannerCart: URL.createObjectURL(file) })
                    }}
                    multiple
                />
            </Button>

            <List style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
            }}>
                {UrlImageBanners.bannerCart &&
                    <img style={{ width: '700px', height: '400px' }} src={UrlImageBanners.bannerCart} alt="a" />
                }
            </List>


            {/* Cart Banner */}
            <br />
            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files Banner Button 1
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImageBanners({ ...FileImageBanners, banner1: file })
                        setUrlImageBanners({ ...UrlImageBanners, banner1: URL.createObjectURL(file) })
                    }}
                    multiple
                />
            </Button>

            <br />
            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files Banner Button 2
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImageBanners({ ...FileImageBanners, banner2: file })
                        setUrlImageBanners({ ...UrlImageBanners, banner2: URL.createObjectURL(file) })
                    }}
                    multiple
                />
            </Button>

            <br />
            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files Banner Button 3
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImageBanners({ ...FileImageBanners, banner3: file })
                        setUrlImageBanners({ ...UrlImageBanners, banner3: URL.createObjectURL(file) })
                    }}
                    multiple
                />
            </Button>

            <br />
            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files Banner Button 4
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImageBanners({ ...FileImageBanners, banner4: file })
                        setUrlImageBanners({ ...UrlImageBanners, banner4: URL.createObjectURL(file) })
                    }}
                    multiple
                />
            </Button>

            <br />
            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files Banner Button 5
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImageBanners({ ...FileImageBanners, banner5: file })
                        setUrlImageBanners({ ...UrlImageBanners, banner5: URL.createObjectURL(file) })
                    }}
                    multiple
                />
            </Button>

            <br />
            <Button
                sx={{ mt: 2, mb: 2 }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files Banner Button 6
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        setFileImageBanners({ ...FileImageBanners, banner6: file })
                        setUrlImageBanners({ ...UrlImageBanners, banner6: URL.createObjectURL(file) })
                    }}
                    multiple
                />
            </Button>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                maxWidth: '100%',
                margin: '10px 0',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: 2,
                overflow: 'auto'
            }} className="box">
                <img style={{ width: '300px' }} src={UrlImageBanners.banner1} alt="a" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner2} alt="a" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner3} alt="a" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner4} alt="a" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner5} alt="a" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner6} alt="a" />
            </div>


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

export default AddDevelopers;
