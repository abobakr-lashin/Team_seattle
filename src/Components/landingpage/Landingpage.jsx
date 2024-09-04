import "./landingpage.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavPar from "../appbar/NavPar"
import { Link } from "react-router-dom"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import FormContainer from "../appbar/FormContainer";
import Slider from "react-slick";

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
<FormContainer/>
</div>
</div>





<div className="slider-container">
        <Slider {...settings}>{imgsetin}</Slider>
        
      </div>
</div>





    </div>
  )
}
