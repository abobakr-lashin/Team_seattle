import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebaseConfig';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BlogsUpdete() {
    const [Database, setDataBase] = useState([]);
    const navigate = useNavigate()

    // Get Data to Firestore
    const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "Blogs"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(docs);
            setDataBase(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        GetDataFireStore();
    }, []);

    // Handle Delete Item
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(firestore, 'Blogs', id));
            console.log('Document successfully deleted!');
            GetDataFireStore();
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    // Handle Update Item
    const handleUpdate = (id) => {
        // Redirect to the update page with the blog ID
        navigate(`/Dashboard/update-blog/${id}`);
    };

    return (
        <div>
            <h3>Formservice</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Img</th>
                            <th>Name</th>
                            <th>Long text</th>
                            <th>Short Text</th>
                            <th>Date</th>
                            <th>Actions Update</th>
                            <th>Actions Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Database.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id.slice(0, 5)}</td>
                                    <td>
                                        {item.fileBlog ? (
                                            <img src={item.fileBlog} alt={item.servies || 'Service Image'} style={{ maxWidth: "100px", height: "auto" }} />
                                        ) : (
                                            'No Image Available'
                                        )}
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.title}</td>
                                    <td>{item.text}</td>
                                    <td>{item.day}/{item.month}/{item.year}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleUpdate(item.id)}
                                        >
                                            Update
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <br /><br /><br />
        </div>
    );
}
