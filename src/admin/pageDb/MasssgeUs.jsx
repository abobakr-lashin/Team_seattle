import { Button, CircularProgress, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { get, getDatabase, ref, remove } from 'firebase/database';
import app from '../../firebaseConfig';

export default function MessageUs() {
    const [databaseRef, setDatabaseRef] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
    const [snackbarMessage, setSnackbarMessage] = useState(''); // Snackbar message

    // Fetch data from Firebase Realtime Database
    const GetDataBase = async () => {
        setLoading(true); // Set loading to true when starting to fetch
        try {
            const db = getDatabase(app);
            const newDataRef = ref(db, 'user/message');
            const snapshot = await get(newDataRef);

            if (snapshot.exists()) {
                setDatabaseRef(Object.values(snapshot.val()));
            } else {
                setDatabaseRef([]); // Set to empty array if no data
            }
        } catch (err) {
            setError("Error fetching data");
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    useEffect(() => {
        GetDataBase();
    }, []);

    const handleDelete = async (id) => {
        if (!id) {
            setError("Invalid ID");
            return;
        }

        try {
            const db = getDatabase(app);
            const messageRef = ref(db, `user/message/${id}`);
            await remove(messageRef);

            // تحديث الحالة بعد الحذف
            // setSubmittedFormMessages((prevData) => prevData.filter((item) => item.id !== id));
            setSnackbarMessage("Data deleted successfully");
            setSnackbarOpen(true);
        } catch (error) {
            setError("Error deleting data");
        }
    };


    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    if (loading) return <CircularProgress />;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h3>Message Us</h3>
            {databaseRef.length === 0 ? (
                <div>No messages found.</div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date & Time</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {databaseRef.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.date}
                                        <br />
                                        {item.time}
                                    </td>
                                    <td>{item.fullName}</td>
                                    <td>{item.contactEmail}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.contactPhone}</td>
                                    <td className="table-cell">{item.contactMessage.slice(0, 30)}</td>
                                    <td>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <br /><br /><br />
        </div>
    );
}
