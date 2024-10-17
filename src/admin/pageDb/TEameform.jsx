import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from '../../firebaseConfig';
import { Link } from 'react-router-dom';

export default function TEameform() {
  const [Database, setDataBase] = useState([]);

  const GetDataFireStore = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "product"));
      const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDataBase(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    GetDataFireStore();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Delete document from Firestore
      await deleteDoc(doc(firestore, "product", id));

      // Remove document from state
      setDataBase((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <h3>JOIN OUR TEAM</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date&Time</th>
              <th>name</th>
              <th>Email</th>
              <th>phone</th>
              <th>number</th>
              <th>files</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Database?.map((item) => (
              <tr key={item.id} style={{ background: item.background || 'white' }}>
                <td>
                  {item.date}
                  <br />
                  {item.time}
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.experience}</td>
                <td className="table-cell bg-red">
                  {item?.fileURLs?.map((it, index) => (
                    <div key={index}>
                      <Link className='btn btn-primary' to={it}>
                        View Details CV {index + 1}
                      </Link>
                      <br />
                    </div>
                  ))}
                </td>
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
      <br /><br /><br />
    </div>
  );
}
