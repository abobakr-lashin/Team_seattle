import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import FormN from "./FormN";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    ABOUT_US: false,
    OUR_PROJECTS: false,
    COMPANIES: false,
    MEDIA_CENTER: false,
    CONTACT_US: false,
  });
  const [languageOpen, setLanguageOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    setDropdownOpen({
      ...dropdownOpen,
      [dropdown]: !dropdownOpen[dropdown],
    });
  };

  const handleMouseEnter = (dropdown) => {
    setDropdownOpen({
      ...dropdownOpen,
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

  return (
    <div className="custom-navbar-brand">
      <Link to="/">
        <img width="200px" src="./uploads/img/LOGO.png" alt="Logo" />
      </Link>
      <nav className="custom-navbar">
        <div className="custom-navbar-toggle" onClick={toggleMenu}>
          <span className="custom-bar"></span>
          <span className="custom-bar"></span>
          <span className="custom-bar"></span>
        </div>
        <ul className={`custom-navbar-menu ${isOpen ? "active" : ""}`}>
          <li className="custom-navbar-item">
            <li
              className="custom-navbar-item"
              onMouseEnter={() => handleMouseEnter("BUY")}
              onMouseLeave={() => handleMouseLeave("BUY")}
              onClick={() => handleDropdownToggle("BUY")}
            >
              <span className="custom-navbar-link ">
                <Link to={"/Buy"}>BUY</Link>{" "}
              </span>
              <div className="Buys">
                <ul
                  className={`custom-dropdown-menu ${
                    dropdownOpen.BUY ? "show" : ""
                  }`}
                >
                  <Grid
                    container
                    spacing={2}
                    className="custom-dropdown-item"
                    display={"flex"}
                  >
                    <Grid item xs={5}>
                      <h3>Buy properties in UAE{">"}</h3>
                      <div className="dis-paly">
                        <ul>
                          <li>Secondary properties</li>
                          <li>🔥Hot Properties</li>
                          <li>🏆Exclusive Properties</li>
                          <li> Apartments</li>
                          <li> Penthouses</li>
                        </ul>
                        <ul>
                          <li>Off-plan</li>
                          <li>Apartments</li>
                          <li>Penthouses</li>
                          <li> Townhouses</li>
                          <li>Villas</li>
                        </ul>
                      </div>
                    </Grid>

                    <Grid item xs={7}>
                      <div className="dis-imgNbuy">
                        <div className="imgNbuy">
                          <img src="./uploads/nav/buy/photo1.png" alt="" />
                        </div>

                        <ul>
                          <h3>Investments abroad</h3>
                          <li>Dubai</li>
                          <li>Sharjah</li>
                          <li>Ajman</li>
                          <li>Ras Al Khaimah</li>
                          <li>Fujairah</li>
                        </ul>
                      </div>
                    </Grid>
                  </Grid>
                </ul>
              </div>
            </li>
          </li>
          <li className="custom-navbar-item">
            <li
              className="custom-navbar-item"
              onMouseEnter={() => handleMouseEnter("RENT")}
              onMouseLeave={() => handleMouseLeave("RENT")}
              onClick={() => handleDropdownToggle("RENT")}
            >
              <span className="custom-navbar-link ">
                <Link to={"/RENT"}>RENT</Link>{" "}
              </span>
              <div className="RENT">
                <ul
                  className={`custom-dropdown-menu ${
                    dropdownOpen.RENT ? "show" : ""
                  }`}
                >
                  <div className="custom-dropdown-item">
                    <h3>Rent properties in Dubai {">"}</h3>
                    <div className="dis-paly2">
                      <ul>
                        <li>Rental Properties</li>
                        <li>Apartments</li>
                        <li>Villas</li>
                        <li> Townhouses</li>
                      </ul>
                      <ul>
                        <li>Landlords Tools</li>
                        <li>🏆 Property Management</li>
                        <li>Utilities Connections and Payments</li>
                      </ul>
                    </div>
                  </div>
                  <div className="imgNbuy">
                    <img src="./uploads/nav/rent/photo2.png" alt="" />
                  </div>
                </ul>
              </div>
            </li>
          </li>

          <li className="custom-navbar-item">
            <li
              className="custom-navbar-item"
              onMouseEnter={() => handleMouseEnter("Commercial")}
              onMouseLeave={() => handleMouseLeave("Commercial")}
              onClick={() => handleDropdownToggle("Commercial")}
            >
              <span className="custom-navbar-link ">
                <Link to={"/Commercial"}>Commercial</Link>{" "}
              </span>
              <div className="Commercial">
                <ul
                  className={`custom-dropdown-menu ${
                    dropdownOpen.Commercial ? "show" : ""
                  }`}
                >
                  <div className="custom-dropdown-item">
                    <h3>Buy commercial properties {">"}</h3>
                    <div className="dis-paly2">
                      <ul>
                        <li>Secondary properties</li>
                        <li>🏢 Offices</li>
                        <li>Hotels</li>
                        <li> Shop</li>
                        <li> Commercial lands</li>
                      </ul>
                    </div>
                  </div>
                  <div className="imgNCommercial">
                    <img src="./uploads/nav/commercial/photo3.png" alt="" />
                  </div>
                  <div className="imgNCommercial">
                    <img src="./uploads/nav/commercial/photo4.png" alt="" />
                  </div>
                </ul>
              </div>
            </li>
          </li>

          <li className="custom-navbar-item">
            <Link to="/SELL" className="custom-navbar-link">
              SELL
            </Link>
          </li>
          <li className="custom-navbar-item">
            <li
              className="custom-navbar-item"
              onMouseEnter={() => handleMouseEnter("DEVELOPERS")}
              onMouseLeave={() => handleMouseLeave("DEVELOPERS")}
              onClick={() => handleDropdownToggle("DEVELOPERS")}
            >
              <span className="custom-navbar-link ">
                <Link to={"/Ourpartners"}>DEVELOPERS</Link>{" "}
              </span>
              <div className="DEVELOPERS">
                <ul
                  className={`custom-dropdown-menu ${
                    dropdownOpen.DEVELOPERS ? "show" : ""
                  }`}
                >
                  <div className="custom-dropdown-item">
                    <h3>See all developers in UAE  {">"}</h3>
                    <div className="dis-paly2">
                      <ul>
                        <li>Top developers

</li>
                        <li>Reportage
                        </li>
                        <li>DAMAC
                        </li>
                        <li> Meraas</li>
                      </ul>
                      <ul>

                        <li>Emaar</li>
                        <li>ALDAR
                        </li>
                        <li> Bloom</li>
                      </ul>
                    </div>
                  </div>
                  <div className="imgNCommercial">
                    <img src="./uploads/nav/developers/photo5.png" alt="" />
                  </div>
             
                </ul>
              </div>
            </li>
          </li>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("OUR_PROJECTS")}
            onMouseLeave={() => handleMouseLeave("OUR_PROJECTS")}
            onClick={() => handleDropdownToggle("OUR_PROJECTS")}
          >
            <span className="custom-navbar-link">
              <Link to="/Abudhabi">AREAS</Link>
            </span>
            <ul
              className={`custom-dropdown-menu ${
                dropdownOpen.OUR_PROJECTS ? "show" : ""
              }`}
            >
              <li>
                <Link className="custom-dropdown-item" to="/login">
                  loginAdmin
                </Link>
              </li>
            </ul>
          </li>
          <li className="custom-navbar-item">
            <Link to="/LatestNews" className="custom-navbar-link">
              Blogs{" "}
            </Link>
          </li>
          <li className="custom-navbar-item">
            <Link to="/Service" className="custom-navbar-link">
              Services
            </Link>
          </li>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("ABOUT_US")}
            onMouseLeave={() => handleMouseLeave("ABOUT_US")}
            onClick={() => handleDropdownToggle("ABOUT_US")}
          >
            <span className="custom-navbar-link">ABOUT US</span>
            <ul
              className={`custom-dropdown-menu ${
                dropdownOpen.ABOUT_US ? "show" : ""
              }`}
            >
              <li>
                <Link className="custom-dropdown-item" to="/TeamS">
                  Our Team
                </Link>
              </li>
              <li>
                <Link className="custom-dropdown-item" to="/Mortgage">
                  JNJ MORTGAGE
                </Link>
              </li>
              <li>
                <Link className="custom-dropdown-item" to="/Spartan">
                  SPARTAN TOURISM
                </Link>
              </li>
            </ul>
          </li>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("CONTACT_US")}
            onMouseLeave={() => handleMouseLeave("CONTACT_US")}
            onClick={() => handleDropdownToggle("CONTACT_US")}
          >
            <span className="custom-navbar-link">CONTACT US</span>
            <ul
              className={`custom-dropdown-menu ${
                dropdownOpen.CONTACT_US ? "show" : ""
              }`}
            >
              <li>
                <Link className="custom-dropdown-item" to="/Careers">
                  CAREERS
                </Link>
              </li>
              <li>
                <Link className="custom-dropdown-item" to="/Contactus">
                  CONTACT US
                </Link>
              </li>
            </ul>
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
          <ul>
            <li className="custom-navbar-item">
              <div className="click-button">
                <FormN name={"Free consultation"} />
              </div>
            </li>
          </ul>
          <li className="custom-navbar-item">
            <div
              className="language-selector-item"
              onClick={toggleLanguageDropdown}
            >
              <Typography variant="body" className="language-selector-title">
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
                  style={{ backgroundImage: 'url("/path/to/arabic-flag.png")' }}
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
