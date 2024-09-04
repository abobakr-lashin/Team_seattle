import "./landingpage.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavPar from "../appbar/NavPar"
import { Link } from "react-router-dom"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormContainer from "../appbar/FormContainer";
import Slider from "react-slick";
import { Grid } from "@mui/material";

export default function Landingpage() {

    const settings = {
        centerMode: true,
        centerPadding: '1',
        slidesToShow: 3,
        focusOnSelect: true,
        infinite: true,
        speed: 600,
        // autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
    

      const imgOurProjects = [
        { id: 1, src:"/uploads/landingpage/export/photo2.png"},
        { id: 1, src:"/uploads/landingpage/export/photo3.png"},
        { id: 1, src:"/uploads/landingpage/export/photo2.png"},
        { id: 1, src:"/uploads/landingpage/export/photo3.png"},

      ];

      const imgsetin = imgOurProjects.map((img) => {
        return(
        <div key={img.id} className="slide-item">
          <div className="Landingpage-img" style={{ backgroundImage: `url(${img.src})` }}>
          
        
          </div>
        </div>)
    });
    const imgSaleIn = [
      {
        id: 1,
        money: "28,000,000",
        CoinsName: "AED",
        bed: 3,
        bath: 4,
        square: 4.067,
        imgbed: "/uploads/commercial/export/icon/bed.png",
        imgbath: "/uploads/commercial/export/icon/bath.png",
        imgsquare: "/uploads/commercial/export/icon/square.png",
        title: "3BR Apartment in One Canal, Al Wasl (MS-12865)",
        LocationOn: "One Canal, Al Wasl",
        Parking :"Parking ",
        Parkingn:4, 
    
      },

      // ... Add more items as needed
    ];
  


    const imgsetsin = imgSaleIn.map((img) => (

            <div className="dis-play1">
              <div>
                <span>
                  <span>{img.bed}</span> <img src={img.imgbed} alt="Bed" />
                </span>
                <div>BEDS</div>
              </div>
              <div>
                <span>
                  <span>{img.bath}</span> <img src={img.imgbath} alt="Bath" />
                </span>
                <div>Baths</div>
              </div>
              <div>
                <span>
                  <span>{img.square}</span> <img src={img.imgsquare} alt="Square" />
                </span>
                <div>Square{`{ft}`}</div>
              </div>
              <div>
                <span>
                  <span>{img.Parkingn }</span> 
                </span>
                <div>Parking </div>
              </div>
            </div>
          
    ));
  


  return (
    <div className="Landingpage">
      
<div className="bg-Landingpage" style={{backgroundImage:`url(/uploads/landingpage/export/photo1.png)`}}>

<NavPar />
        <div className="h-5vh"></div>

        <div className="grop-title">
          <div className="img-dis">
            <img src="/uploads/img/marpa.png" alt="" />
          </div>
          <div className="title-dis7" style={{ display: "flex" }}>
            <h2>
              Home{" "}
              <Link to={"/"}>
                {" "}
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "#d3b76d", fontSize: "65px" }}
                />
              </Link>
              OUR PROJECTS 
              <Link to={"/"}>
                {" "}
                <KeyboardDoubleArrowRightIcon
                  sx={{ color: "#d3b76d", fontSize: "65px" }}
                />
              </Link>
              <div style={{ textTransform: "uppercase" }}>SAMA YAS (NEW LAUNCH)</div>
            </h2>
          </div>
        </div>
<div className="contbg">
<div className="formheader">
<FormContainer color={"rgba(255, 255, 255, 0.466)"}/>
</div>
</div>





<div className="slider-container">
        <Slider {...settings}>{imgsetin}</Slider>
        
      </div>
</div>

<div className="h-5vh"></div>
<div className="h-5vh"></div>
<Grid container spacing={2} sx={{margin:"auto",width:"90%"}}>
  <Grid item xs={8}>
<div className="Sitedetails">

<div className="address">
5BR Villa in District One Villas, Mohammed Bin Rashid City (MP-R-5896)

</div>
<div className="theprice">
1,550,000 AED

</div>
<div className="theprices">
129,167 AED (per month)


</div>
<div className="hr1"></div>

{imgsetsin}
<div className="hr1"></div>
<p>Looking for a luxurious contemporary villa that comes with a private pool and landscaped garden?
Do you want to live in a gated community in a prime location?
These plush homes are the perfect setting to start a family or raise children.
Genuine and discerning property investors will enjoy the experience of living in luxury.
The brilliant architecture exudes an undeniably appealing atmosphere.</p>

<div className="PropertyDetails">

  <ul>
    <li>5 Bedrooms with ensuite bath</li>
    <li>6 Bathrooms</li>
    <li>Area: 9,094 square feet</li>
    <li>Unfurnished</li>
    <li>Luxury finishing    </li>
    <li>Landscaped garden    </li>
    <li>Private pool  </li>
    <li>Contemporary style   </li>
    <li>Vacant & ready to move in  </li>
  </ul>
</div>


</div>








  </Grid>
  <Grid item xs={4} alignItems={"center"}justifyContent={"center"}>

<div className="ContactAgent">
  <div className="title">Contact Agent</div>

  <div className="imgctext">
<div className="imgcontact"><img src="/uploads/landingpage/export/photo3.png" alt="" /></div>
<div className="text">
  <div className=" Listing">Listing by 
  </div>
  <div className="name">Ramin Sadeghi
  </div>
  <div className="contact ">
    <img width={"20px"} style={{margin:"2px"}} src="/uploads/landingpage/export/icon/star.png" alt="star" />
    <img width={"20px"} style={{margin:"2px"}} src="/uploads/landingpage/export/icon/star.png" alt="star" />
    <img width={"20px"} style={{margin:"2px"}} src="/uploads/landingpage/export/icon/star.png" alt="star" />
    <img width={"20px"} style={{margin:"2px"}} src="/uploads/landingpage/export/icon/star.png" alt="star" />
    <img width={"20px"} style={{margin:"2px"}} src="/uploads/landingpage/export/icon/star.png" alt="star" />
    <img width={"20px"} style={{margin:"2px"}} src="/uploads/landingpage/export/icon/star.png" alt="star" />
</div>
</div>
  </div>
<div className="Email">Email</div>



</div>
<div className="formc">

<FormContainer color={"#06404d"}/>
</div>



  </Grid>
 
 
</Grid>


    </div>
  )
}
