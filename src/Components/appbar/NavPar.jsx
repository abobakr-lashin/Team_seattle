import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import FormN from "./FormN";
import Typography from "@mui/material/Typography";
import { Grid, ImageListTileBar, IconButton } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [DataBase, setDataBase] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState({
    ABOUT_US: false,
    OUR_PROJECTS: false,
    COMPANIES: false,
    MEDIA_CENTER: false,
    CONTACT_US: false,
    BUY: false,
    RENT: false,
    Commercial: false,
    SELL: false,
    DEVELOPERS: false,
    AREAS: false,
  });
  const [languageOpen, setLanguageOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    setDropdownOpen({
      ABOUT_US: false,
      OUR_PROJECTS: false,
      COMPANIES: false,
      MEDIA_CENTER: false,
      CONTACT_US: false,
      BUY: false,
      RENT: false,
      Commercial: false,
      SELL: false,
      DEVELOPERS: false,
      AREAS: false,
      [dropdown]: !dropdownOpen[dropdown],
    });
  };

  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Add event listener to detect click outside the navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector("custom-navbar-menu");
      if (navbar && !navbar.contains(event.target)) {
        closeMenu();
      }
    };

    // Add event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleMouseEnter = (dropdown) => {
    setDropdownOpen({
      ABOUT_US: false,
      OUR_PROJECTS: false,
      COMPANIES: false,
      MEDIA_CENTER: false,
      CONTACT_US: false,
      BUY: false,
      RENT: false,
      Commercial: false,
      SELL: false,
      DEVELOPERS: false,
      AREAS: false,
      [dropdown]: true,
    });
  };

  const handleMouseLeave = (dropdown) => {
    setDropdownOpen({
      ...dropdownOpen,
      [dropdown]: false,
    });
  };

  const toggleLanguageDropdown = () => {
    setLanguageOpen(!languageOpen);
  };

  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setLanguageOpen(false);
  };

  // Get Data to Firestore
  const GetDataFireStore = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "category"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setDataBase(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };
  const handltap = () => {
    let show = document.querySelector(".custom-dropdown-menu.show");

    if (show) {
      show.style.display = "none";
    } else {
      show = document.querySelector(".custom-dropdown-menu");
      if (show) {
        show.style.display = "flex";
      }
    }

    let naAll = document.querySelector(".custom-navbar-link");

    if (naAll) {
      naAll.onclick = () => {
        if (show) {
          show.style.display = "flex";
        }
      };
    }
  };
  useEffect(() => {
    GetDataFireStore();
  }, []);
  // التحكم في إظهار القائمة بناءً على حالة checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Toggle dropdown for BUY
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="custom-navbar-brand">
      <Link to="/">
        <img className="logo-nav"  src="./uploads/img/LOGO.png" alt="Logo" />
      </Link>
      <nav className="custom-navbar">
        <div className="custom-navbar-toggle" onClick={toggleMenu}>
          <span className="custom-bar"></span>
          <span className="custom-bar"></span>
          <span className="custom-bar"></span>
        </div>
        <ul className={`custom-navbar-menu ${isOpen ? "active" : ""}`}>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("BUY")}
            onMouseLeave={() => handleMouseLeave("BUY")}
            onClick={() => handleDropdownToggle("BUY")}
          >
            <span className="custom-navbar-link">
              <Link to="/Buy">BUY</Link>
            </span>
            <div className="Buys">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.BUY ? "show" : "none"
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>
                <div  container spacing={2} className="custom-dropdown-item  dis-buy">
             <div className="dis-buy">
             <div item  lg={5} xs={12}>
                    <h3>
                    PURCHASE PROPERTIES IN THE UAE
                    {" "}
                      <img src="./uploads/nav/icon/arrow.png" alt="" />
                    </h3>
                    <div className="dis-paly">
                      <ul>
                        <h4> Secondary properties

</h4>
                        <li>
                   
                          {"  "}Hot Properties

                        </li>
                        <li>
                          {"  "}Exclusive Properties

                        </li>
                        <li>Apartments</li>
                        <li>Penthouses</li>
                      </ul>
                      <ul>
                        <h4>Off-plan

</h4>
                        <li>Apartments</li>
                        <li>Penthouses</li>
                        <li>Townhouses</li>
                        <li>Villas</li>
                      </ul>
                    </div>
                  </div>

                  <div item lg={7} xs={12}>
                    <div className="dis-imgNbuy">
                      <div className="imgNbuy">
                        <img src="./uploads/nav/buy/1.png" alt="" />
                      </div>

                      <ul className="ullest">
                        <h3>INVEST BY EMIRATE

</h3>
                        <li>Abu Dhabi
                        </li>
                        <li>Dubai</li>
                        <li>Sharjah</li>
                        <li>Ajman</li>
                        <li>Ras Al Khaimah
                        </li>
                        <li>Fujairah</li>
                      </ul>
                    </div>
                  </div>
             </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </li>

          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("RENT")}
            onMouseLeave={() => handleMouseLeave("RENT")}
            onClick={() => handleDropdownToggle("RENT")}
          >
            <span className="custom-navbar-link">
              <Link to="/RENT">RENT</Link>
            </span>

            <div className="RENT">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.RENT ? "show" : ""
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>

                <Grid
                  container
                  spacing={2}
                  className="custom-dropdown-item dis-paly2"
                >
                  <div className="dis-paly2">
                    <Grid item lg={7} xs={12}>
                      <h3>
                        RENT PROPERTIES IN THE UAE{" "}
                        <img src="./uploads/nav/icon/arrow.png" alt="" />
                      </h3>
                      <div className="dis-paly3">
                        <ul>
                          <h4>Rental Properties</h4>
                          <li>Apartments</li>
                          <li>Villas</li>
                          <li>Townhouses</li>
                        </ul>
                        <ul>
                          <h4>Landlords Tools</h4>
                          <li>Property Management</li>
                          <li>Utilities Connections and Payments</li>
                        </ul>
                      </div>
                    </Grid>
                    <Grid item lg={5} xs={12}>
                      <div className="imgNbuy">
                        <img src="./uploads/nav/rent/2.png" alt="" />
                      </div>
                    </Grid>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </Grid>
              </ul>
            </div>
          </li>

          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("Commercial")}
            onMouseLeave={() => handleMouseLeave("Commercial")}
            onClick={() => handleDropdownToggle("Commercial")}
          >
            <span className="custom-navbar-link">
              <Link to="/Commercial">COMMERCIAL</Link>
            </span>
            <div className="Commercial">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.Commercial ? "show" : ""
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>

                <Grid container spacing={2} className="custom-dropdown-item">
                  <Grid item xs={5}>
                    <h3>
                      Buy commercial properties{" "}
                      <img src="./uploads/nav/icon/arrow.png" alt="" />
                    </h3>

                    <ul>
                      <h4>Rental Properties</h4>
                      {DataBase.slice(0, 4).map((it) => {
                        return (

                          <li key={it.id}>
                            <Link to={`/${it.name}`}>{it.name}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </Grid>
                  <Grid item xs={7} display={"flex"}>
                    <div className="imgNCommercial">
                      <img src="./uploads/nav/commercial/2.png" alt="" />
                    </div>
                    <div className="imgNCommercial">
                      <img src="./uploads/nav/commercial/4.png" alt="" />
                    </div>
                  </Grid>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </Grid>
              </ul>
            </div>
          </li>

          <li className="custom-navbar-item">
            <Link to="/SELL" className="custom-navbar-link">
              SELL
            </Link>
          </li>

          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("DEVELOPERS")}
            onMouseLeave={() => handleMouseLeave("DEVELOPERS")}
            onClick={() => handleDropdownToggle("DEVELOPERS")}
          >
            <span className="custom-navbar-link">
              <Link to="/Ourpartners">DEVELOPERS</Link>
            </span>
            <div className="developers">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.DEVELOPERS ? "show" : ""
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>

                <Grid container spacing={2} className="custom-dropdown-item">
                  <Grid item xs={5}>
                    <h3>
                      See all developers in UAE{" "}
                      <img src="./uploads/nav/icon/arrow.png" alt="" />
                    </h3>
                    <div className="dis-paly2">
                      <ul>
                        <h4>Top developers</h4>
                        <li>Emaar</li>
                        <li>ALDAR</li>
                        <li>Bloom</li>
                      </ul>
                      <ul>
                        <li>Select Group
                        </li>
                        <li>Reportage</li>
                        <li>DAMAC</li>
                        <li>Meraas</li>
                      </ul>
                    </div>
                    <div className="dis-paly2">
                      <li className="aldar">
                        <img src="./uploads/nav/developers/aldar.png" alt="" />
                      </li>
                      <li className="aldar">
                        <img src="./uploads/nav/developers/bloom.png" alt="" />
                      </li>
                      <li className="aldar">
                        <img src="./uploads/nav/developers/damac.png" alt="" />
                      </li>
                      <li className="aldar">
                        <img src="./uploads/nav/developers/emaar.png" alt="" />
                      </li>
                    </div>
                    <ul></ul>
                  </Grid>
                  <Grid item xs={7}>
                    <div className="imgNCommercial">
                      <img src="./uploads/nav/developers/1.png" alt="" />
                    </div>
                  </Grid>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </Grid>
              </ul>
            </div>
          </li>

          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("AREAS")}
            onMouseLeave={() => handleMouseLeave("AREAS")}
            onClick={() => handleDropdownToggle("AREAS")}
          >
            <span className="custom-navbar-link">
              <Link to="/Abudhabi">AREAS</Link>
            </span>
            <div className="AREAS">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.AREAS ? "show" : ""
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>

                <Grid container spacing={2} className="custom-dropdown-item">
                  <Grid item lg={4} md={12}>
                    <h3>
                    DISCOVER AREAS IN THE UAE

{" "}
                      <img src="./uploads/nav/icon/arrow.png" alt="" />
                    </h3>
                    <div className="dis-paly">
                      <ul>
                        <li>Palm Jumeirah</li>
                        <li>Yas Island
                        </li>
                        <li>Downtown Dubai
                        </li>
                        <li>Saadiyat Island
                        </li>
                        <li>Maryah Island
                        </li>
                        <li>Al Reem Island
                        </li>
                      </ul>
                      <ul>
                        <li>Rabdan
                        </li>
                        <li>Khalifa City
                        </li>
                        <li>Al Raha City
                        </li>
                        <li>Masdar City
                        </li>
                        <li>Zayed City
                        </li>
                      </ul>
                    </div>
                  </Grid>

                  <Grid item lg={7} md={12}>
                    <div className="dis-imgNbuy">
                      <div className="imgNbuy">
                        <img src="./uploads/nav/areas/1.png" alt="" />
                      </div>

                      <ul>
                        <h3>BY EMIRATES

</h3>
                        <li>Abu Dhabi
                        </li>
                        <li>Dubai</li>
                        <li>Sharjah</li>
                        <li>Ajman
                        </li>
                        <li>Ras Al Khaimah
                        </li>
                        <li>Fujairah
                        </li>
                      </ul>
                    </div>
                  </Grid>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </Grid>
              </ul>
            </div>
          </li>

          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("Blogs")}
            onMouseLeave={() => handleMouseLeave("Blogs")}
            onClick={() => handleDropdownToggle("Blogs")}
          >
            <span className="custom-navbar-link">
              <Link to="/LatestNews">BLOGS</Link>
            </span>
            <div className="Blogs">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.Blogs ? "show" : ""
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>

                <Grid
                  container
                  spacing={2}
                  className="custom-dropdown-item"
                  sx={{ display: "flex" }}
                >
                  <Grid item spacing={2} xs={5}>
                    <h3>
                      Buy properties in UAE{" "}
                      <img src="./uploads/nav/icon/arrow.png" alt="" />
                    </h3>
                    <div className="dis-paly">
                      <p>
                        A Comprehensive Guide Discover everything you need to
                        know about life and culture in the UAE. Learn how the
                        emirates are organized, explore work and investment
                        opportunities, and get detailed instructions on applying
                        for visas, extending stays, and making purchases.
                      </p>
                    </div>
                    <div>
                      <div className="dis-paly1">
                        <div className="img">
                          <img src="./uploads/nav/blogs/photo10.png" alt="" />
                        </div>
                        <div className="titel">
                          <h5>The Future of the UAE Real Estate Market</h5>
                          <p>
                            Securing Your Dream Home: Navigating Market,
                            Finances.
                            <p>19 / August / 2024</p>
                          </p>
                        </div>
                      </div>
                      <div className="dis-paly1">
                        <div className="img">
                          <img src="./uploads/nav/blogs/photo9.png" alt="" />
                        </div>
                        <div className="titel">
                          <h5>The Future of the UAE Real Estate Market</h5>
                          <p>
                            Securing Your Dream Home: Navigating Market,
                            Finances.
                            <p>19 / August / 2024</p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={7}>
                    <div className="dis-imgNbuy">
                      <div className="imgNbuy">
                        <div className="imgNbuy1">
                          <img src="./uploads/nav/blogs/photo7.png" alt="" />
                        </div>
                        <div className="imgNbuy2">
                          <img src="./uploads/nav/blogs/photo8.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </Grid>
              </ul>
            </div>
          </li>

          <li className="custom-navbar-item">
            <Link to="/Service" className="custom-navbar-link">
              SERVICES
            </Link>
          </li>

          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("ABOUT_US")}
            onMouseLeave={() => handleMouseLeave("ABOUT_US")}
            onClick={() => handleDropdownToggle("ABOUT_US")}
          >
            <span className="custom-navbar-link">
              <Link to={"/About"}>ABOUT US</Link>
            </span>

            <div className="ABOUT">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.ABOUT_US ? "show" : ""
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>

                <Grid container spacing={2} className="custom-dropdown-item">
                  <Grid item xs={7}>
                    <Link to={"/About"}>
                      <h3>
                        About us{" "}
                        <img src="./uploads/nav/icon/arrow.png" alt="" />
                      </h3>
                      <div className="dis-paly2">
                        <p>
                          Founded in 2021, Seattle & Middle East stands as a
                          premier real estate firm headquartered in Abu Dhabi,
                          distinguished by our commitment to providing exemplary
                          property solutions across the UAE, GCC, and select
                          international markets.
                        </p>
                      </div>
                    </Link>
                    <div className="dis-paly2">
                      <li className="aldar">
                        <Link to={"/TeamS"}>
                          {" "}
                          <h6>Our Team </h6>{" "}
                          <img src="./uploads/nav/aboutus/team.png" alt="" />
                        </Link>
                      </li>
                      <li className="aldar">
                        <Link to={"/Mortgage"}>
                          {" "}
                          <h6>JNJ-MORTGAGE </h6>{" "}
                          <img src="./uploads/nav/aboutus/jnj.png" alt="" />{" "}
                        </Link>
                      </li>
                      <li className="aldar">
                        <Link to={"/Spartan"}>
                          {" "}
                          <h6>SPARTAN TOURISM</h6>
                          <img src="./uploads/nav/aboutus/spartan.png" alt="" />
                        </Link>
                      </li>
                    </div>
                    <ul></ul>
                  </Grid>
                  <Grid item xs={5}>
                    <div className="imgNCommercial">
                      <img src="./uploads/nav/aboutus/photoabout.png" alt="" />
                    </div>
                  </Grid>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </Grid>
              </ul>
            </div>
          </li>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("CONTACT_US")}
            onMouseLeave={() => handleMouseLeave("CONTACT_US")}
            onClick={() => handleDropdownToggle("CONTACT_US")}
          >
            <span className="custom-navbar-link">CONTACT US</span>

            <div className="CONTACT">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.CONTACT_US ? "show" : ""
                }`}
              >
                <div className="bt-back" onClick={handltap}>
                  رجوع
                </div>

                <Grid container spacing={2} className="custom-dropdown-item">
                  <Grid md={6} xs={12}>
                    <div className="imgcon">
                  <h2>Elevate Your Career
                  </h2>
                  <h3>Join Our Team of Real Estate Experts Today.

</h3>
                    </div>
                    <div className="dis-paly2">
                      <ul>
                        <li>
                          <Link className="custom-dropdown-item" to="/Careers">
                            CAREERS{" "}
                            <img src="./uploads/nav/icon/arrow.png" alt="" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="custom-dropdown-item"
                            to="/Contactus"
                          >
                            CONTACT US{" "}
                            <img src="./uploads/nav/icon/arrow.png" alt="" />
                          </Link>
                        </li>
                        <li>
                          <Link className="custom-dropdown-item" to="/Login">
                            login{" "}
                            <img src="./uploads/nav/icon/arrow.png" alt="" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Grid>
                  <Grid md={6} xs={12}>
                    <div className="imgNCommercial">
                      <img src="./uploads/nav/contactus/1.png" alt="" />
                    </div>
                  </Grid>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <h3>Schedule your free consultation today</h3>
                        <h4>
                          And our team will help you find the ideal property for
                          your needs
                        </h4>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                </Grid>
              </ul>
            </div>
          </li>

          <li className="custom-navbar-item">
            <Link
              to="tel:+971502135701"
              className="number"
              style={{
                textDecoration: "none",
                color: "#bfb78f",
                fontWeight: "bold",
              }}
            >
              +971502135701
            </Link>
          </li>

          <li className="custom-navbar-item">
            <div className="click-button">
              <FormN name={"Free consultation"} />
            </div>
          </li>

          <li className="custom-navbar-item">
            <div
              className="language-selector-item"
              onClick={toggleLanguageDropdown}
            >
              <Typography variant="body1" className="language-selector-title">
                <span className="selected-language">{selectedLanguage}</span>
              </Typography>
            </div>
            <div
              className={`language-dropdown-menu ${languageOpen ? "show" : ""}`}
            >
              <div
                className="language-option"
                onClick={() => handleLanguageSelect("العربية")}
              >
                <div
                  className="language-flag"
                  style={{
                    backgroundImage: 'url("/path/to/arabic-flag.png")',
                  }}
                ></div>
                <span>العربية</span>
              </div>
              <div
                className="language-option"
                onClick={() => handleLanguageSelect("English")}
              >
                <div
                  className="language-flag"
                  style={{
                    backgroundImage: 'url("/path/to/english-flag.png")',
                  }}
                ></div>
                <span>English</span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
