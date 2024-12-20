import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormN from "./FormN";
import Typography from "@mui/material/Typography";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import "./Navbar.css";
import "./Navphone.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [DataBase, setDataBase] = useState([]);
  const [Secondaryproperties, setSecondaryProperties] = useState([]);
  const [offPlan, setOffPlan] = useState([]);
  const [language, setLocation] = useState([]);
  const [RentalProperties, setRentalProperties] = useState([]);
  const [LandlordsTools, setLandlordsTools] = useState([]);
  const [dataBloge, setDataBloge] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState({
    ABOUT_US: false,
    OUR_PROJECTS: false,
    COMPANIES: false,
    MEDIA_CENTER: false,
    APPLY: false,
    BUY: false,
    RENT: false,
    Commercial: false,
    SELL: false,
    DEVELOPERS: false,
    AREAS: false,
  });
  const [languageOpen, setLanguageOpen] = useState(false);
  // Add State Banner
  const [BannerBuy, setBannerBuy] = useState([]);
  const [BannerRent, setBannerRent] = useState([]);
  const [BannerCommercial, setBannerCommercial] = useState([]);
  const [BannerDeveloper, setBannerDeveloper] = useState([]);
  const [BannerAreas, setBannerAreas] = useState([]);
  const [BannerBlogs, setBannerBlogs] = useState([]);
  const [DataDeveloper, setDataDeveloper] = useState([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdownToggle = (dropdown) => {
    setDropdownOpen({
      ABOUT_US: false,
      OUR_PROJECTS: false,
      COMPANIES: false,
      MEDIA_CENTER: false,
      APPLY: false,
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
      APPLY: false,
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
    // Get Data from Firestore
    try {
      const querySnapshot = await getDocs(collection(firestore, "Blogs"));
      const docs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt ? data.createdAt.toDate() : null,
        };
      });

      // Sort only if createdAt is valid (i.e., not null)
      docs.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt - a.createdAt;
        } else {
          return 0;
        }
      });

      setDataBloge(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  // Get Data Category
  const getCategories = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "categoryBuyPlan")
      );
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filterPlan = docs.filter((item) => {
        return item.CategoryPlan === "Secondary properties";
      });
      setSecondaryProperties(filterPlan);

      const filterPlanOff = docs.filter((item) => {
        return item.CategoryPlan === "Off-plan";
      });
      setOffPlan(filterPlanOff);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    // Get Data from Firestore
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "CategoryBuyLocation")
      );
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      docs.sort((a, b) => b.createdAt.toDate() + a.createdAt.toDate());

      setLocation(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    try {
      const querySnapshot = await getDocs(
        collection(firestore, "categoryRentPlan")
      );
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filterPlan = docs.filter((item) => {
        return item.CategoryPlan === "Rental Properties";
      });
      setRentalProperties(filterPlan);

      const filterPlanOff = docs.filter((item) => {
        return item.CategoryPlan === "Landlords Tools";
      });
      setLandlordsTools(filterPlanOff);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  // handle Filter
  const handleToggleDropdown = (dropdown) => {
    setDropdownOpen({
      ...dropdownOpen,
      [dropdown]: !dropdownOpen[dropdown],
    });
  };

  const GetDataBanner = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "bannerBuy"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setBannerBuy(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    // Banner Rent
    try {
      const querySnapshot = await getDocs(collection(firestore, "bannerRent"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setBannerRent(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    // Banner Commercial
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "bannerCommercial")
      );
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setBannerCommercial(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    // Banner Developer
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "bannerDeveloper")
      );
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setBannerDeveloper(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    // Banner Areas
    try {
      const querySnapshot = await getDocs(collection(firestore, "bannerAreas"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setBannerAreas(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }

    // Banner Blogs
    try {
      const querySnapshot = await getDocs(collection(firestore, "bannerBlogs"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setBannerBlogs(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "CategoryDevelopers")
      );
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      docs.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
      setDataDeveloper(docs);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    GetDataFireStore();
    getCategories();
    GetDataBanner();
  }, []);

  return (
    <div className="custom-navbar-brand">
      <Link to="/">
        <img
          className="logo-nav"
          src="./uploads/img/LOGO.png"
    height={"auto"}
    width={"auto"}

          alt="SEATTLE & MiDDLE East"
        />
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
            onClick={() => handleToggleDropdown("BUY")}
          >
            <span
              className="custom-navbar-link"
              onClick={() => handleDropdownToggle("BUY")}
            >
              <Link to="/Buy">BUY</Link>
            </span>
            <div className="Buys">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.BUY ? "show" : ""
                }`}
              >
                <div className="custom-dropdown-item  dis-buy">
                  <div className="dis-buy">
                    <div item lg={5} xs={12}>
                      <h3>
                        PURCHASE PROPERTIES IN THE UAE{" "}
                        <img src="./uploads/nav/icon/arrow.png" alt="" />
                      </h3>
                      <div className="dis-paly">
                        <ul>
                          <h4> Secondary properties</h4>
                 
                          <li>
                            <Link to={`/buy/category/Hot properties`}>
                              Hot properties
                            </Link>
                          </li>
                          <li>
                            <Link to={`/buy/category/Exclusive Properties`}>
                              Exclusive Properties
                            </Link>
                          </li>
                          <li>
                            <Link to={`/buy/category/Apartments`}>
                              Apartments
                            </Link>
                          </li>
                          <li>
                            <Link to={`/buy/category/Penthouses`}>
                              Penthouses
                            </Link>
                          </li>
                        </ul>
                        <ul>
                          {/*  */}
                          <h4>Off-plan</h4>
          
                          <li>
                            <Link to={`/Seattle/category/Apartments`}>
                              Apartments
                            </Link>
                          </li>
                          <li>
                            <Link to={`/Seattle/category/Penthouses`}>
                              Penthouses
                            </Link>
                          </li>
                          <li>
                            <Link to={`/Seattle/category/Townhouses`}>
                              Townhouses
                            </Link>
                          </li>
                          <li>
                            <Link to={`/Seattle/category/Villas`}>Villas</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div item lg={7} xs={12}>
                      <div className="dis-imgNbuy">
                        <div className="imgNbuy">
                          {BannerBuy?.slice(0, 1).map((it) => {
                            return <img src={it.imageBuy} alt="" />;
                          })}
                        </div>
                        <ul className="ullest">
                          <h3>INVEST BY EMIRATE</h3>
                          <li>
                            <Link to={"/Buy/Category/Location/Abu Dhabi"}>
                              Abu Dhabi
                            </Link>
                          </li>
                          <li>
                            <Link to={"/Buy/Category/Location/Dubai"}>
                              Dubai
                            </Link>
                          </li>
                          <li>
                            <Link to={"/Buy/Category/Location/Sharjah"}>
                              Sharjah
                            </Link>
                          </li>
                          <li>
                            <Link to={"/Buy/Category/Location/Ajman"}>
                              Ajman
                            </Link>
                          </li>
                          <li>
                            <Link to={"/Buy/Category/Location/Ras Al Khaimah"}>
                              Ras Al Khaimah
                            </Link>
                          </li>
                          <li>
                            <Link to={"/Buy/Category/Location/Fujairah"}>
                              Fujairah
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        to={"https://www.linkedin.com/company/seattleme/"}
                        rel="noopener noreferrer"
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
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
                <div container spacing={2} className="custom-dropdown-item  ">
                  <div className="dis-paly2 dis-buy">
                    <div item lg={7} xs={12}>
                      <h3>
                        RENT PROPERTIES IN THE UAE{" "}
                        <img src="./uploads/nav/icon/arrow.png" alt="" />
                      </h3>
                      <div className="dis-paly3">
                        <ul>
                          <h4>Rental Properties</h4>
                          {RentalProperties?.map((it) => {
                            return (
                              <li>
                                <Link to={`/Rent/Filter/${it.name}`}>
                                  {it.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                        <ul>
                          <h4>Landlords Tools</h4>
                          {LandlordsTools?.map((it) => {
                            return (
                              <li>
                                <Link to={`/Rent/Filter/${it.name}`}>
                                  {it.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div item lg={5} xs={12}>
                      <div className="imgNbuy">
                        {BannerRent?.slice(0, 1).map((it) => {
                          return <img src={it.imageRent} alt="" />;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.linkedin.com/company/seattleme/"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
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
                <div container spacing={2} className="custom-dropdown-item">
                  <h3>
                    BUY COMMERCIAL PROPERTIES{" "}
                    <img src="./uploads/nav/icon/arrow.png" alt="" />
                  </h3>
                  <div className="dis-buy">
                    <div item xs={5}>
                      <ul>
                        <h4>Secondary properties</h4>
                        {DataBase.slice(0, 4).map((it) => {
                          return (
                            <li key={it.id}>
                              <Link to={`/Commercial/${it.name}`}>
                                {it.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div item xs={7} className={"dis-buy2"}>
                      {BannerCommercial?.slice(0, 1).map((it) => {
                        return (
                          <>
                            <div className="imgNCommercial">
                              <img src={it.imageCommercial1} alt="" />
                            </div>
                            <div className="imgNCommercial">
                              <img src={it.imageCommercial2} alt="" />
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>

                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>

                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.linkedin.com/company/seattleme/"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
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
                <div container spacing={2} className="custom-dropdown-item">
                  <h3>
                    THE UAE’S TOP DEVELOPERS{" "}
                    <img src="./uploads/nav/icon/arrow.png" alt="" />
                  </h3>
                  <div className="dis-buy">
                    <div item xs={5}>
                      <h4>Top developers</h4>
                      <div className="dis-paly2">
                        <ul>
                          <li>
                            <Link to={`/developers/EMAAR`}>EMAAR</Link>
                          </li>
                          <li>
                            <Link to={`/developers/ALDAR`}>ALDAR</Link>
                          </li>
                          <li>
                            <Link to={`/developers/DAMAC`}>DAMAC</Link>
                          </li>
                          <li>
                            <Link to={`/developers/BLOOM`}>BLOOM</Link>
                          </li>
                        </ul>

                        <ul>
                          <li>
                            <Link to={`/developers/SELECT GROUP`}>
                              SELECT GROUP
                            </Link>
                          </li>

                          <li>
                            <Link to={`/developers/AZIZI`}>AZIZI</Link>
                          </li>
                        </ul>
                      </div>
                      <div className="dis-paly2">
                        <li className="aldar">
                          <Link to={`/developers/ALDAR`}>
                            <img
                              src="./uploads/nav/developers/aldar.png"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li className="aldar">
                          <Link to={`/developers/BLOOM`}>
                            <img
                              src="./uploads/nav/developers/bloom.png"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li className="aldar">
                          <Link to={`/developers/DAMAC`}>
                            <img
                              src="./uploads/nav/developers/damac.png"
                              alt=""
                            />
                          </Link>
                        </li>
                        <li className="aldar">
                          <Link to={`/developers/EMAAR`}>
                            <img
                              src="./uploads/nav/developers/emaar.png"
                              alt=""
                            />
                          </Link>
                        </li>
                      </div>
                      <ul></ul>
                    </div>
                    <div item xs={7}>
                      <div className="imgNCommercial">
                        {/* Develop */}
                        {BannerDeveloper?.slice(0, 1).map((it) => {
                          return <img src={it.imageDeveloper} alt="" />;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.linkedin.com/company/seattleme/"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
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
                <div container spacing={2} className="custom-dropdown-item ">
                  <div className="dis-buy">
                    <div className="dis-buy1">
                      <h3>
                        DISCOVER AREAS IN THE UAE{" "}
                        <img src="./uploads/nav/icon/arrow.png" alt="" />
                      </h3>
                      <div item lg={4} md={12} className="dis-buy">
                        <div className="dis-paly">
                          <ul>
                            <li>
                              <Link to={"/Areas/location/center/Palm Jumeirah"}>
                                Palm Jumeirah
                              </Link>
                            </li>
                            <li>
                              <Link to={"/Areas/location/center/Yas Island"}>
                                Yas Island
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/Areas/location/center/Downtown Dubai"}
                              >
                                Downtown Dubai
                              </Link>
                            </li>
                            <li>
                              <Link to={"/Areas/location/center/Maryah Island"}>
                                Maryah Island
                              </Link>
                            </li>
                            <li>
                              <Link
                                to={"/Areas/location/center/Al Reem Island"}
                              >
                                Al Reem Island
                              </Link>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <Link to={"/Areas/location/center/Rabdan"}>
                                Rabdan
                              </Link>
                            </li>
                            <li>
                              <Link to={"/Areas/location/center/Khalifa City"}>
                                Khalifa City
                              </Link>
                            </li>
                            <li>
                              <Link to={"/Areas/location/center/Al Raha City"}>
                                Al Raha City
                              </Link>
                            </li>
                            <li>
                              <Link to={"/Areas/location/center/Masdar City"}>
                                Masdar City
                              </Link>
                            </li>
                            <li>
                              <Link to={"/Areas/location/center/Zayed City"}>
                                Zayed City
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="dis-areas">
                      <div className="imgNbuy">
                        {BannerAreas?.slice(0, 1).map((it) => {
                          return <img src={it.imageAreas} alt="" />;
                        })}
                      </div>
                      <div className="dis-imgNbuy">
                        <ul>
                          <h3>BY EMIRATES</h3>
                          <li>
                            <Link
                              to={"/Areas/Category/Location/Center/Abu Dhabi"}
                            >
                              Abu Dhabi
                            </Link>
                          </li>
                          <li>
                            <Link to={"/Areas/Category/Location/Center/Dubai"}>
                              Dubai
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/Areas/Category/Location/Center/Sharjah"}
                            >
                              Sharjah
                            </Link>
                          </li>
                          <li>
                            <Link to={"/Areas/Category/Location/Center/Ajman"}>
                              Ajman
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={
                                "/Areas/Category/Location/Center/Ras Al Khaimah"
                              }
                            >
                              Ras Al Khaimah
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={"/Areas/Category/Location/Center/Fujairah"}
                            >
                              Fujairah
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.linkedin.com/company/seattleme/"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
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
                <div container spacing={2} className="custom-dropdown-item">
                  <h3>
                    <Link to="/LatestNews">
                      EXPLORE THE UAE{" "}
                      <img src="./uploads/nav/icon/arrow.png" alt="" />
                    </Link>
                  </h3>
                  <div className="dis-buy">
                    <div className="titledis">
                      <div className="dis-paly3">
                        <div>
                          <div className="p9">
                            A Comprehensive Guide to Investing in Real Estate in
                            the UAE <br /> Seattle & Middle East: Your Trusted
                            Partner in Real Estate Investment
                          </div>
                          <div className="p2 pt-2 pb-1">
                            The UAE has evolved into a premier global
                            destination for real estate investment, <br /> a
                            vision realized by its leadership. Attracting
                            investors with its strategic location, <br /> robust
                            economy, and tax-free incentives, the UAE offers
                            diverse opportunities <br /> across residential,
                            commercial, and industrial sectors. Seattle & Middle
                            East is <br />
                            committed to guiding you through this dynamic market
                            to maximize your investment <br /> potential.
                          </div>
                        </div>
                      </div>
                      {/* Nav Bar Blogs */}
                      {dataBloge?.slice(0, 2).map((it) => {
                        return (
                          <Link
                            to={`/blog/${it.id}`}
                            style={{}}
                            className="dis-paly1"
                          >
                            <div className="img">
                              <img src={it?.imageLanding} alt="" />
                            </div>
                            <div className="titel">
                              <h5>{it.title}</h5>
                              <p>
                                {it.textInput.slice(0, 100)}...
                                <br />
                                <br />
                                <p>
                                  {it.DateS.day}/{it.DateS.month}/
                                  {it.DateS.year}
                                </p>
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div item xs={7}>
                      <div className="dis-imgNbuy">
                        {BannerBlogs?.slice(0, 1).map((it) => {
                          return (
                            <>
                              <div className="imgNbuy">
                                <img src={it.imageBlogs1} alt="" />
                              </div>
                              <div className="imgNbuy">
                                <img src={it.imageBlogs2} alt="" />
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.linkedin.com/company/seattleme/"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
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
                <div container spacing={2} className="custom-dropdown-item">
                  <div className="dis-buy">
                    <div item xs={7}>
                      <Link to={"/About"}>
                        <h3>
                          About us{" "}
                          <img src="./uploads/nav/icon/arrow.png" alt="" />
                        </h3>
                        <div className="dis-paly2">
                          <p>
                            Founded in 2021, Seattle & Middle East stands as a
                            premier real estate firm headquartered in Abu Dhabi,
                            distinguished by our commitment to providing
                            exemplary property solutions across the UAE, GCC,
                            and select international markets.
                          </p>
                        </div>
                      </Link>
                      <div className="dis-paly2">
                        <li className="aldar">
                          <Link to={"/TeamS"}>
                            {" "}
                            <img src="./uploads/nav/aboutus/s&me.png" alt="" />
                          </Link>
                        </li>
                        <li className="aldar">
                          <Link to={"/Mortgage"}>
                            {" "}
                            <img
                              src="./uploads/nav/aboutus/jnj.png"
                              alt=""
                            />{" "}
                          </Link>
                        </li>
                        <li className="aldar">
                          <Link to={"/Spartan"}>
                            {" "}
                            <img
                              src="./uploads/nav/aboutus/spartan.png"
                              alt=""
                            />
                          </Link>
                        </li>
                      </div>
                      <ul></ul>
                    </div>
                    <div item xs={5}>
                      <div className="imgNCommercial">
                        <img src="./uploads/nav/aboutus/1.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.linkedin.com/company/seattleme/"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </li>
          <li
            className="custom-navbar-item"
            onMouseEnter={() => handleMouseEnter("APPLY")}
            onMouseLeave={() => handleMouseLeave("APPLY")}
            onClick={() => handleDropdownToggle("APPLY")}
          >
            <span className="custom-navbar-link">
              <Link to="/Contactus">APPLY</Link>
            </span>

            <div className="APPLY">
              <ul
                className={`custom-dropdown-menu ${
                  dropdownOpen.APPLY ? "show" : ""
                }`}
              >
                <div container spacing={2} className="custom-dropdown-item">
                  <div className="dis-buy">
                    <div md={6} xs={12}>
                      <div className="dis-paly2">
                        <ul>
                          <div className="imgcon">
                            <h2>Elevate Your Career</h2>
                            <h3>Join Our Team of Real Estate Experts Today.</h3>
                          </div>
                          <li>
                            <Link to="/Careers">
                              CAREERS{" "}
                              <img src="./uploads/nav/icon/arrow.png" alt="" />
                            </Link>
                          </li>
                          <li>
                            <Link to="/Contactus">
                              CONTACT US{" "}
                              <img src="./uploads/nav/icon/arrow.png" alt="" />
                            </Link>
                          </li>
            
                        </ul>
                      </div>
                    </div>
                    <div md={6} xs={12}>
                      <div className="imgNCommercial">
                        <img src="./uploads/nav/contactus/1.png" alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="imgnp">
                    <div className="disi">
                      <div>
                        <div className="h3">
                          Schedule your free consultation today
                        </div>
                        <div className="h4">
                          And our team will help you find the ideal property for
                          your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgnp1">
                    <div className="disi">
                      <div>
                        <div className="h3">Schedule your free</div>
                        <div className="h3">consultation today</div>
                        <div className="h4">
                          And our team will help you find
                        </div>
                        <div className="h4">
                          find the ideal property for your needs
                        </div>
                      </div>
                      <FormN name={"Free consultation"} />
                    </div>
                  </div>
                  <div className="imgiconstw">
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.facebook.com/seattleme"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/facebook_1384005.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/instagram_1384015.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.linkedin.com/company/seattleme/"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/linkedin_1384014.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={
                          "https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"
                        }
                      >
                        <img
                          src="./uploads/nav/phone/icons/snapchat_3669965.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={"https://www.threads.net/@seattlemiddleeast"}
                      >
                        <img
                          src="./uploads/nav/phone/icons/threads.png"
                          alt="face"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
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

export default React.memo(Navbar);
