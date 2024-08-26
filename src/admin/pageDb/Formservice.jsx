import React, { useEffect, useState } from 'react';
import "./table.css";
import { Button } from '@mui/material';
import { get, getDatabase, ref, remove } from 'firebase/database';
import app, { db } from '../../firebaseConfig';

export default function Formservice() {
    const [databaseRef, setDatabaseRef] = useState([])


    // Get DataBase Service
    const GetDataFireBase = async () => {
        try {
            const DataBase = getDatabase(app);
            const newDataRef = ref(DataBase, 'services/message');
            const snapshot = await get(newDataRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const items = Object.keys(data).map(key => ({
                    key,
                    ...data[key]
                }));
                setDatabaseRef(items);
            }
        } catch (err) {
            console.log("Error:", err);
        }
    }
    console.log(databaseRef);



    // Handle Delete item
    const handleDelete = (key) => {
        const itemRef = ref(getDatabase(app), `services/message/${key}`);

        remove(itemRef)
            .then(() => {
                console.log(`Item with Key: ${key} has been deleted successfully.`);
                setDatabaseRef((prevDatabaseRef) =>
                    prevDatabaseRef.filter(item => item.key !== key)
                );
            })
            .catch((error) => {
                console.error("Error deleting item:", error);
            });

    };

    // Get DataBase Service useEffect Hook
    useEffect(() => {
        GetDataFireBase()
    }, [])


    return (
        <div>
            <h3>Formservice</h3>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>service</th>
                            <th>name</th>
                            <th>Email</th>
                            <th>phone</th>
                            <th>masseg</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {databaseRef?.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        {(item.date)}
                                        <br />
                                        {(item.time)}
                                    </td>
                                    <td>{item.servies}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{item.message.slice(0, 50)}</td>
                                    <td>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(item.key)}>
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