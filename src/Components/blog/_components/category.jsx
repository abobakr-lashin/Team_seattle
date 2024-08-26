import React, { useEffect, useState } from 'react';
import { firestore } from '../../../firebaseConfig';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "./category.css";

const Category = ({ id }) => {
    const [formData, setFormData] = useState([]);
    const navigate = useNavigate()


    // Fetch data FireBase 
    const GetDataFireStore = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "Blogs"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(docs);
            setFormData(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        GetDataFireStore();
    }, []);

    const ateg = formData.filter((item) => {
        return item.id !== id;
    })
    const handleReadMore = (id) => {
        navigate(`/blog/${id}`);
    };


    return (
        <>
            <div className="card-me">
                {ateg?.slice(0, 5).map(item => {
                    return (
                        <>
                        <div className='categoryFlex'    key={item.id}>

                      <div className='categoryimg'> 
                          <img src={item.fileBlog} alt="" />
                          </div>
            
                            <div className="title-button">
                                <p>{item.title}</p>
                                <button className="read-More2" onClick={ ()=>handleReadMore(item.id)}>read more</button>
                            </div> 
                             </div>
                        </>
                    )
                })}
            </div>
        </>
    );
}

export default Category;
