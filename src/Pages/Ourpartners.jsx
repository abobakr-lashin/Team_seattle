import React, { useEffect } from 'react'
import NavPar from './../Components/appbar/NavPar'
import Footer from './../Components/footer/Footer.jsx'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Box } from '@mui/material'
import { Link } from 'react-router-dom';
import FormN from '../Components/appbar/FormN.jsx';
import OUREXPERT from './OUREXPERT.jsx';
import "./OurPartners.css"
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig.js';
export default function OurPartners() {
  const [data, setData] = React.useState([]);


  // Get Data Cart Firebase
  const getCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "CategoryDevelopers"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);


  return (
    <div className='one'>
      <div className='OurPartners'>
        <NavPar />

        <div className="h-5vh"></div>

        <div className="grop-title">
          <div className="img-dis">
            <img src="/uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis7">
            <h1>Home <Link to={"/"}><KeyboardDoubleArrowRightIcon sx={{ color: "#d3b76d", fontSize: "65px" }} /> </Link> </h1>
            <div style={{ textTransform: "uppercase" }}>Developers</div>
          </div>
        </div>
        <div className="h-5vh"></div>

        <Box sx={{
          width: "80%", margin: "20px auto"
        }}>
          <div className="img-Developers">

            <h2 style={{ textTransform: "uppercase" }}>Developers in uae</h2>

          </div>
          <div className="h-5vh"></div>
          <div className='display12'>
            {data.map((it) => {
              return <div key={it.id}>
                <Link to={`/Developers/${it.name}`}>
                  <img className='imgBigOurPartners' src={it.image} alt="" />
                </Link>
              </div>
            })
            }

          </div>

        </Box>
        <OUREXPERT />
        <div className="h-5vh"></div>

        <Footer />
      </div>
    </div>
  )
}
