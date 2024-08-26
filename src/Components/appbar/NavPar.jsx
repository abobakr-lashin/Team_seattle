import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import FormN from "./FormN";
import Typography from '@mui/material/Typography';

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

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setLanguageOpen(false);
  };

  return (
    <div className="custom-navbar-brand">
      <Link to="/">
        <img width="220px" src="./uploads/img/LOGO.png" alt="Logo" />
      </Link>
      <nav className="custom-navbar">
        <div className="custom-navbar-toggle" onClick={toggleMenu}>
          <span className="custom-bar"></span>
          <span className="custom-bar"></span>
          <span className="custom-bar"></span>
        </div>
        <ul className={`custom-navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="custom-navbar-item">
            <Link to="/services" className="custom-navbar-link">BUY</Link>
          </li>
          <li className="custom-navbar-item">
            <Link to="/services" className="custom-navbar-link">RENT</Link>
          </li>
          <li className="custom-navbar-item">
            <Link to="/Commercial" className="custom-navbar-link">COMMERCIAL</Link>
          </li>
          <li className="custom-navbar-item">
            <Link to="/Service" className="custom-navbar-link">Services</Link>
          </li>
          <li className="custom-navbar-item">
            <Link to="/Ourpartners" className="custom-navbar-link">DEVELOPERS</Link>
          </li>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter('OUR_PROJECTS')}
            onMouseLeave={() => handleMouseLeave('OUR_PROJECTS')}
            onClick={() => handleDropdownToggle('OUR_PROJECTS')}
          >
            <span className="custom-navbar-link">AREAS</span>
            <ul className={`custom-dropdown-menu ${dropdownOpen.OUR_PROJECTS ? 'show' : ''}`}>
              <li>
                <Link className="custom-dropdown-item" to="/Abudhabi">
                  ABU DHABI
                </Link>
              </li>
              <li>
                <Link className="custom-dropdown-item" to="/login">
                  loginAdmin
                </Link>
              </li>
            </ul>
          </li>
          <li className="custom-navbar-item">
            <Link to="/LatestNews" className="custom-navbar-link">BOLGE</Link>
          </li>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter('ABOUT_US')}
            onMouseLeave={() => handleMouseLeave('ABOUT_US')}
            onClick={() => handleDropdownToggle('ABOUT_US')}
          >
            <span className="custom-navbar-link">ABOUT US</span>
            <ul className={`custom-dropdown-menu ${dropdownOpen.ABOUT_US ? 'show' : ''}`}>
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
            onMouseEnter={() => handleMouseEnter('CONTACT_US')}
            onMouseLeave={() => handleMouseLeave('CONTACT_US')}
            onClick={() => handleDropdownToggle('CONTACT_US')}
          >
            <span className="custom-navbar-link">CONTACT US</span>
            <ul className={`custom-dropdown-menu ${dropdownOpen.CONTACT_US ? 'show' : ''}`}>
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
            <Link to="tel:+971502135701" className='number' style={{ textDecoration: 'none', color: "#bfb78f", fontWeight: "bold" }}>
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
            <div className="language-selector-item" onClick={toggleLanguageDropdown}>
              <Typography variant="body" className="language-selector-title">
                <span className="selected-language">{selectedLanguage}</span>
              </Typography>
            </div>
            <div className={`language-dropdown-menu ${languageOpen ? 'show' : ''}`}>
              <div className="language-option" onClick={() => handleLanguageSelect('العربية')}>
                <div className="language-flag" style={{ backgroundImage: 'url("/path/to/arabic-flag.png")' }}></div>
                <span>العربية</span>
              </div>
              <div className="language-option" onClick={() => handleLanguageSelect('English')}>
                <div className="language-flag" style={{ backgroundImage: 'url("/path/to/english-flag.png")' }}></div>
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
