import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "./table.css";
import { get, getDatabase, ref, remove } from 'firebase/database';
import app from '../../firebaseConfig';

export default function RequestQuote() {
  const [DatabaseRef, setDatabaseRef] = useState([])

  // Get DataBase Service
  const GetDataFireBase = async () => {
    try {
      const DataBase = getDatabase(app);
      const newDataRef = ref(DataBase, 'Quote/massages');
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


  // Handle Delete item
  const handleDelete = (key) => {
    const itemRef = ref(getDatabase(app), `Quote/massages/${key}`);

    remove(itemRef)
      .then(() => {
        // console.log(`Item with Key: ${key} has been deleted successfully.`);
        setDatabaseRef((prevDatabaseRef) =>
          prevDatabaseRef.filter(item => item.key !== key)
        );
      })
      .catch((error) => {
        // console.error("Error deleting item:", error);
      });

  };


  useEffect(() => {
    GetDataFireBase()
  }, [])

  // console.log(DatabaseRef);  


  return (
    <div>
      <h3>Request_Quote</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date&Time</th>
              <th>name</th>
              <th>Email</th>
              <th>phone</th>
              <th>Required_Service</th>
              <th>masseg</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {DatabaseRef.map((item) => {
              return (
                <tr key={item.key} style={{ background: 'white' }}>
                  <td>
                    {item.date}
                    <br />
                    {item.time}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.requiredService}</td>
                  <td style={{ whiteSpace: "pre-wrap"}}>{item.message}</td>
                  <td>
                    <Button variant="contained" onClick={() => handleDelete(item.key)}>Delete</Button>
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
