import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Stack, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { firestore, storage } from '../../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

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

const UpdateDeveloper = () => {
    const Navigste = useNavigate()
    const [category, setCategory] = useState('');
    const [FileImage, setFileImage] = useState(null);
    const [fileUrl, setfileUrl] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [Data, setData] = useState([])
    const [FileImageBanners, setFileImageBanners] = useState({
        bannerCart: null,
        banner1: null,
        banner2: null,
        banner3: null,
        banner4: null,
        banner5: null,
        banner6: null,
    });
    const { id } = useParams()

    const [UrlImageBanners, setUrlImageBanners] = useState({
        bannerCart: null,
        banner1: null,
        banner2: null,
        banner3: null,
        banner4: null,
        banner5: null,
        banner6: null,
    });



    const handleAddCategory = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {

            let downloadimage = Data.image;
            let downloadurlBannerCart = Data.bannerCart;
            let Download1 = Data.banner1;
            let Download2 = Data.banner2;
            let Download3 = Data.banner3;
            let Download4 = Data.banner4;
            let Download5 = Data.banner5;
            let Download6 = Data.banner6;

            // Cheake Category 
            if (FileImage) {
                const image = ref(storage, `fileImage/${FileImage.name}/${new Date()}`)
                await uploadBytes(image, FileImage);
                downloadimage = await getDownloadURL(image);
            }


            // Banner Cart
            if (FileImageBanners.bannerCart) {
                const BannerCart = ref(storage, `file/Image/banner/${FileImageBanners.bannerCart.name}/${new Date()}`)
                await uploadBytes(BannerCart, FileImageBanners.bannerCart);
                downloadurlBannerCart = await getDownloadURL(BannerCart);
            }



            // Banner 1
            if (FileImageBanners.banner1) {
                const Banner1 = ref(storage, `file/Image/${FileImageBanners.banner1.name}/${new Date()}`)
                await uploadBytes(Banner1, FileImageBanners.banner1);
                Download1 = await getDownloadURL(Banner1);
            }


            // Banner 2
            if (FileImageBanners.banner2) {
                const Banner2 = ref(storage, `file/Image/${FileImageBanners.banner2.name}/${new Date()}`)
                await uploadBytes(Banner2, FileImageBanners.banner2);
                Download2 = await getDownloadURL(Banner2);
            }


            // Banner 3
            if (FileImageBanners.banner3) {
                const Banner3 = ref(storage, `file/Image/${FileImageBanners.banner3.name}/${new Date()}`)
                await uploadBytes(Banner3, FileImageBanners.banner3);
                Download3 = await getDownloadURL(Banner3);

            }


            // Banner 4
            if (FileImageBanners.banner4) {
                const Banner4 = ref(storage, `file/Image/${FileImageBanners.banner4.name}/${new Date()}`)
                await uploadBytes(Banner4, FileImageBanners.banner4);
                Download4 = await getDownloadURL(Banner4);
            }



            // Banner 5
            if (FileImageBanners.banner5) {
                const Banner5 = ref(storage, `file/Image/${FileImageBanners.banner5.name}/${new Date()}`)
                await uploadBytes(Banner5, FileImageBanners.banner5);
                Download5 = await getDownloadURL(Banner5);
            }



            // Banner 6
            if (FileImageBanners.banner6) {
                const Banner6 = ref(storage, `file/Image/${FileImageBanners.banner6.name}/${new Date()}`)
                await uploadBytes(Banner6, FileImageBanners.banner6);
                Download6 = await getDownloadURL(Banner6);
            }

            if (Data.name === category) {
                setError('Category already exists!');
            } else {
                const docRef = doc(firestore, 'CategoryDevelopers', id);
                await updateDoc(docRef, {
                    name: category || Data.name,
                    image: Data.image || downloadimage,
                    bannerCart: Data.bannerCart || downloadurlBannerCart,
                    banner1: Data.banner1 || Download1,
                    banner2: Data.banner2 || Download2,
                    banner3: Data.banner3 || Download3,
                    banner4: Data.banner4 || Download4,
                    banner5: Data.banner5 || Download5,
                    banner6: Data.banner6 || Download6,
                    createdAt: new Date(),
                });
                toast.success('Update Category successfully!.')
                setCategory('');
                Navigste('/dashboard/Developers')
                return
            }
        } catch (err) {
            setError('Error Update category: ' + err.message);
        } finally {
            setLoading(false);
        }
    };


    const getCategories = async () => {
        try {
            const querySnapshot = doc(firestore, "CategoryDevelopers", id);
            const docSnap = await getDoc(querySnapshot)
            if (docSnap.exists()) {
                setData(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    console.log(Data);

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Add Developers</Typography>
            <input type="text" value={Data.name} name="name" id="name" />
            <List>
                <img style={{ width: '200px' }} src={
                    fileUrl ? fileUrl : Data.image
                } alt="" />
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
                {UrlImageBanners &&
                    <img style={{ width: '700px', height: '400px' }} src={
                        fileUrl ? UrlImageBanners.bannerCart : Data.bannerCart
                    } alt="" />
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
                <img style={{ width: '300px' }} src={UrlImageBanners.banner1 ? UrlImageBanners.banner1 : Data.banner1} alt="" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner2 ? UrlImageBanners.banner2 : Data.banner2} alt="" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner3 ? UrlImageBanners.banner3 : Data.banner3} alt="" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner4 ? UrlImageBanners.banner4 : Data.banner4} alt="" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner5 ? UrlImageBanners.banner5 : Data.banner5} alt="" />
                <img style={{ width: '300px' }} src={UrlImageBanners.banner6 ? UrlImageBanners.banner6 : Data.banner6} alt="" />
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
                        Update Category
                    </Button>
                )}
            </Box>

        </Box>
    );
};

export default UpdateDeveloper;
