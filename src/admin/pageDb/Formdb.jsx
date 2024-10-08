import { Alert, Button, CircularProgress, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "./table.css";
import app, { firestore } from '../../firebaseConfig';
import { getDatabase, ref, get, remove } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { collection, getDocs } from 'firebase/firestore';

export default function Formdb() {
    const [DatabaseRef, setDatabaseRef] = useState([]);
    const [DatabaseOffers, setDatabaseOffers] = useState([]);
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(null);
    const [dataFormBlog, setDataFormBlog] = useState([]);

    const Dataase = async () => {
        try {
            const db = getDatabase(app);
            const newDataRef = ref(db, 'nature/fruits');
            const newDataOffers = ref(db, 'specials/offers');
            const newDatablogs = ref(db, 'special/offers');


            const snapshot = await get(newDataRef);
            const snapshotOffers = await get(newDataOffers);
            const snapshotBlogs = await get(newDatablogs);


            if (snapshot.exists()) {
                setDatabaseRef(Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value })));
            } else {
                setDatabaseRef([]);
            }

            if (snapshotOffers.exists()) {
                setDatabaseOffers(Object.entries(snapshotOffers.val()).map(([id, value]) => ({ id, ...value })));
            } else {
                setDatabaseOffers([]);
            }
            if (snapshotBlogs.exists()) {
                setDataFormBlog(Object.entries(snapshotBlogs.val()).map(([id, value]) => ({ id, ...value })));
            } else {
                setDataFormBlog([]);
            }
        } catch (error) {
            setError("Error fetching data");
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        Dataase();
    }, []);

    const handleDeleteOffers = async (id) => {
        try {
            const db = getDatabase(app);
            const offerRef = ref(db, `specials/offers/${id}`);
            await remove(offerRef);

            setDatabaseOffers((prevData) => prevData.filter((item) => item.id !== id));
            toast.success("Offer deleted successfully");
        } catch (error) {
            setError("Error deleting offer");
            toast.error("Error deleting offer");
            console.error("Error deleting offer:", error);
        }
    };

    const handleDeleteitem = async (id) => {
        try {
            const db = getDatabase(app);
            const fruitRef = ref(db, `nature/fruits/${id}`);
            await remove(fruitRef);

            setDatabaseRef((prevData) => prevData.filter((item) => item.id !== id));
            toast.success("Fruit deleted successfully");
        } catch (error) {
            setError("Error deleting fruit");
            toast.error("Error deleting fruit");
            console.error("Error deleting fruit:", error);
        }
    };

    const handleDeleteitemBlog = async (id) => {
        try {
            const db = getDatabase(app);
            const fruitRef = ref(db, `special/offers/${id}`);
            await remove(fruitRef);

            setDataFormBlog((prevData) => prevData.filter((item) => item.id !== id));
            toast.success("Fruit deleted successfully");
        } catch (error) {
            setError("Error deleting fruit");
            toast.error("Error deleting fruit");
            console.error("Error deleting fruit:", error);
        }
    };

    if (Loading) return <CircularProgress />;
    if (Error) return <Alert severity="error">{Error}</Alert>;

    return (
        <div>
            <ToastContainer />
            <h3>Form Landing Page</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>date</th>
                            <th>name</th>
                            <th>phone</th>
                            <th>email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataFormBlog.map((item) => (
                            <tr key={item.id} style={{ background: 'white' }}>
                                <td>{item.date}<br/>{item.time}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteitemBlog(item.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h3>FormNav</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>name</th>
                            <th>Email</th>
                            <th>phone</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DatabaseOffers.map((item) => (
                            <tr key={item.id} style={{ background: 'white' }}>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteOffers(item.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br /><br /><br />
            <h3>FormHeader</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>name</th>
                            <th>phone</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DatabaseRef.map((item) => (
                            <tr key={item.id} style={{ background: 'white' }}>
                                <td>{item.date}</td>
                                <td>{item.time}</td>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteitem(item.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br /><br /><br />
            <br /><br /><br />
        </div>
    );
}
