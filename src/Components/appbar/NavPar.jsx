import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormN from "./FormN";
import Typography from "@mui/material/Typography";
import { Grid, ImageListTileBar, IconButton, Dialog } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import "./Navbar.css";
import "./Navphone.css";
import { Block } from "@mui/icons-material";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [DataBase, setDataBase] = useState([]);
    const [Secondaryproperties, setSecondaryProperties] = useState([]);
    const [offPlan, setOffPlan] = useState([]);
    const [language, setLocation] = useState([]);
    const [RentalProperties, setRentalProperties] = useState([]);
    const [LandlordsTools, setLandlordsTools] = useState([]);
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
    };
   
    // Get Data Category
    const getCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(firestore, "categoryBuyPlan"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            const filterPlan = docs.filter((item) => {
                return item.CategoryPlan === "Secondary properties";
            });
            setSecondaryProperties(filterPlan)

            const filterPlanOff = docs.filter((item) => {
                return item.CategoryPlan === "Off-plan";
            });
            setOffPlan(filterPlanOff)
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }

        // Get Data from Firestore
        try {
            const querySnapshot = await getDocs(collection(firestore, "CategoryBuyLocation"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setLocation(docs);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }

        try {
            const querySnapshot = await getDocs(collection(firestore, "categoryRentPlan"));
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            const filterPlan = docs.filter((item) => {
                return item.CategoryPlan === "Rental Properties";
            });
            setRentalProperties(filterPlan)

            const filterPlanOff = docs.filter((item) => {
                return item.CategoryPlan === "Landlords Tools";
            });
            setLandlordsTools(filterPlanOff)
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }

    }

    // handle Filter 

    const handleToggleDropdown = (dropdown) => {
        setDropdownOpen({
            ...dropdownOpen,
            [dropdown]: !dropdownOpen[dropdown],
        });


    };

 
    //     setDropdownOpen(null);
    // };

    // // دالة للتحكم في عرض وإخفاء القائمة بناءً على حالة hover
    // const handleBack = (show) => {
    //     const back = document.querySelector(".custom-dropdown-menu.show");
    //     const back2 = document.querySelector(".custom-navbar-item .custom-dropdown-menu:hover");

    //         back.style.display = show ? "block" : "none"; // إخفاء أو إظهار القائمة بناءً على `show`
    //         back2.style.display = show ? "block" : "none"; // إخفاء أو إظهار القائمة بناءً على `show`
    // };

    // // إضافة أحداث عند تحميل المكون
    // useEffect(() => {
    //     const dropdown = document.querySelector(".custom-navbar-item");

    //     if (dropdown) {
    //         // عرض القائمة عند دخول الماوس
    //         dropdown.addEventListener("mouseenter", () => handleBack(false));

    //         // إخفاء القائمة عند خروج الماوس
    //         dropdown.addEventListener("mouseleave", () => handleBack(true));
    //     }

    //     // تنظيف الأحداث عند تفكيك المكون
    //     return () => {
    //         if (dropdown) {
    //             dropdown.removeEventListener("mouseenter", () => handleBack(false));
    //             dropdown.removeEventListener("mouseleave", () => handleBack(true));
    //         }
    //     };
    // }, []); // يتم تشغيل هذا الـ useEffect مرة واحدة عند تحميل المكون

// Example of attaching events to control display based on hover

    useEffect(() => {
        GetDataFireStore();
        getCategories();
    }, []);


  
    return (
        <div className="custom-navbar-brand">
            <Link to="/">
                <img className="logo-nav" src="./uploads/img/LOGO.png" alt="Logo" />
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
                        <span className="custom-navbar-link"          
                        onClick={() => handleDropdownToggle("BUY")}
                        >

                            <Link to="/Buy">BUY</Link>
                        </span>
                        <div className="Buys">
                        <ul className={`custom-dropdown-menu ${dropdownOpen.BUY ? "show" : ""}`}>
                        <div
                                    className="custom-dropdown-item  dis-buy"
                                >
<div className="bt-back" >
رجوع
                                </div>
                                    <div className="dis-buy">
                                        <div item lg={5} xs={12}>
                                            <h3>
                                                PURCHASE PROPERTIES IN THE UAE{" "}
                                                <img src="./uploads/nav/icon/arrow.png" alt="" />
                                            </h3>
                                            <div className="dis-paly">
                                                <ul>
                                                    {/*  */}
                                                    <h4> Secondary properties</h4>
                                                    {Secondaryproperties?.map((it) => {
                                                        return (
                                                            <li><Link to={`/buy/category/${it.name}`}>{it.name}</Link></li>
                                                        )
                                                    })}
                                                </ul>
                                                <ul>
                                                    {/*  */}
                                                    <h4>Off-plan</h4>
                                                    {offPlan?.map((it) => {
                                                        return (
                                                            <li><Link to={`/buy/category/${it.name}`}>{it.name}</Link></li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div item lg={7} xs={12}>
                                            <div className="dis-imgNbuy">
                                                <div className="imgNbuy">
                                                    <img src="./uploads/nav/buy/1.png" alt="" />
                                                </div>
                                                <ul className="ullest">
                                                    <h3>INVEST BY EMIRATE</h3>
                                                    {language?.map((it) => {
                                                        return (
                                                            <li><Link to={`/Buy/Location/${it.name}`}>{it.name}</Link></li>
                                                        )
                                                    })}
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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
                                className={`custom-dropdown-menu ${dropdownOpen.RENT ? "show" : ""
                                    }`}
                            >
                                <div className="bt-back" >
                                    رجوع
                                </div>
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
                                                            <li><Link to={`/Rent/Filter/${it.name}`}>{it.name}</Link></li>
                                                        )
                                                    })}
                                                </ul>
                                                <ul>
                                                    <h4>Landlords Tools</h4>
                                                    {LandlordsTools?.map((it) => {
                                                        return (
                                                            <li><Link to={`/Rent/Filter/${it.name}`}>{it.name}</Link></li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div item lg={5} xs={12}>
                                            <div className="imgNbuy">
                                                <img src="./uploads/nav/rent/2.png" alt="" />
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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
                                className={`custom-dropdown-menu ${dropdownOpen.Commercial ? "show" : ""
                                    }`}
                            >
                                <div className="bt-back" >
                                    رجوع
                                </div>

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
                                                            <Link to={`/Commercial/${it.name}`}>{it.name}</Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                        <div item xs={7} className={"dis-buy2"}>
                                            <div className="imgNCommercial">
                                                <img src="./uploads/nav/commercial/2.png" alt="" />
                                            </div>
                                            <div className="imgNCommercial">
                                                <img src="./uploads/nav/commercial/4.png" alt="" />
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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
                                className={`custom-dropdown-menu ${dropdownOpen.DEVELOPERS ? "show" : ""
                                    }`}
                            >
                                <div className="bt-back" >
                                    رجوع
                                </div>

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
                                                    <li>Emaar</li>
                                                    <li>ALDAR</li>
                                                    <li>Bloom</li>
                                                </ul>
                                                <ul>
                                                    <li>Select Group</li>
                                                    <li>DAMAC</li>
                                                    <li>Meraas</li>
                                                </ul>
                                            </div>
                                            <div className="dis-paly2">
                                                <li className="aldar">
                                                    <img
                                                        src="./uploads/nav/developers/aldar.png"
                                                        alt=""
                                                    />
                                                </li>
                                                <li className="aldar">
                                                    <img
                                                        src="./uploads/nav/developers/bloom.png"
                                                        alt=""
                                                    />
                                                </li>
                                                <li className="aldar">
                                                    <img
                                                        src="./uploads/nav/developers/damac.png"
                                                        alt=""
                                                    />
                                                </li>
                                                <li className="aldar">
                                                    <img
                                                        src="./uploads/nav/developers/emaar.png"
                                                        alt=""
                                                    />
                                                </li>
                                            </div>
                                            <ul></ul>
                                        </div>
                                        <div item xs={7}>
                                            <div className="imgNCommercial">
                                                <img src="./uploads/nav/developers/1.png" alt="" />
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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
                                className={`custom-dropdown-menu ${dropdownOpen.AREAS ? "show" : ""
                                    }`}
                            >
                                <div className="bt-back" >
                                    رجوع
                                </div>

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
                                                        <li>Palm Jumeirah</li>
                                                        <li>Yas Island</li>
                                                        <li>Downtown Dubai</li>
                                                        <li>Saadiyat Island</li>
                                                        <li>Maryah Island</li>
                                                        <li>Al Reem Island</li>
                                                    </ul>
                                                    <ul>
                                                        <li>Rabdan</li>
                                                        <li>Khalifa City</li>
                                                        <li>Al Raha City</li>
                                                        <li>Masdar City</li>
                                                        <li>Zayed City</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="dis-areas">

                                        <div className="imgNbuy">
                                            <img src="./uploads/nav/areas/1.png" alt="" />
                                        </div>
                                        <div className="dis-imgNbuy">
                                            <ul>
                                                <h3>BY EMIRATES</h3>
                                                <li>Abu Dhabi</li>
                                                <li>Dubai</li>
                                                <li>Sharjah</li>
                                                <li>Ajman</li>
                                                <li>Ras Al Khaimah</li>
                                                <li>Fujairah</li>
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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
                                className={`custom-dropdown-menu ${dropdownOpen.Blogs ? "show" : ""
                                    }`}
                            >
                                <div className="bt-back" >
                                    رجوع
                                </div>

                                <div container spacing={2} className="custom-dropdown-item">
                                    <div className="dis-buy">
                                        <div className="titledis">
                                            <h3>
                                                EXPLORE THE UAE{" "}
                                                <img src="./uploads/nav/icon/arrow.png" alt="" />
                                            </h3>
                                            <div className="dis-paly3">
                                                <div>
                                                    <div className="p9">
                                                        A Comprehensive Guide to Investing in Real Estate in
                                                        the UAE <br /> Seattle & Middle East: Your Trusted Partner
                                                        in Real Estate Investment
                                                    </div>
                                                    <div className="p2 pt-2 pb-1">
                                                        The UAE has evolved into a premier global
                                                        destination for real estate investment, <br /> a vision
                                                        realized by its leadership. Attracting investors
                                                        with its strategic location, <br /> robust economy, and
                                                        tax-free incentives, the UAE offers diverse
                                                        opportunities <br /> across residential, commercial, and
                                                        industrial sectors. Seattle & Middle East is <br />
                                                        committed to guiding you through this dynamic market
                                                        to maximize your investment <br /> potential.
                                                    </div>
                                                </div>
                                            </div>
                                            <div>

                                                <div className="dis-paly1 pb-1">
                                                    <div className="img">
                                                        <img src="./uploads/nav/bolgs/3.png" alt="" />
                                                    </div>
                                                    <div className="titel">
                                                        <h5>The Future of the UAE Real Estate Market</h5>
                                                        <p>
                                                            Exploring Trends and Opportunities in a Dynamic
                                                            Landscape
                                                            <p> 21 / August / 2024</p>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="dis-paly1">
                                                    <div className="img">
                                                        <img src="./uploads/nav/bolgs/4.png" alt="" />
                                                    </div>
                                                    <div className="titel">
                                                        <h5>
                                                            The Ultimate Guide to Buying Your First Home in
                                                            the UAE
                                                        </h5>
                                                        <p>
                                                            Securing Your Dream Home: Navigating Market,
                                                            Finances
                                                            <p> 19 / August / 2024</p>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div item xs={7}>
                                            <div className="dis-imgNbuy">
                                                <div className="imgNbuy">
                                                    <div className="imgNbuy1">
                                                        <img src="./uploads/nav/bolgs/1.png" alt="" />
                                                    </div>
                                                    <div className="imgNbuy2">
                                                        <img src="./uploads/nav/bolgs/2.png" alt="" />
                                                    </div>
                                                </div>
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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
                                className={`custom-dropdown-menu ${dropdownOpen.ABOUT_US ? "show" : ""
                                    }`}
                            >
                                <div className="bt-back" >
                                    رجوع
                                </div>

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
                                                        <img src="./uploads/nav/aboutus/s&me.png" alt="" />
                                                    </Link>
                                                </li>
                                                <li className="aldar">
                                                    <Link to={"/Mortgage"}>
                                                        {" "}
                                                        <img src="./uploads/nav/aboutus/jnj.png" alt="" />{" "}
                                                    </Link>
                                                </li>
                                                <li className="aldar">
                                                    <Link to={"/Spartan"}>
                                                        {" "}
                                                        <img src="./uploads/nav/aboutus/spartan.png" alt="" />
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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
                        <span className="custom-navbar-link">APPLY</span>

                        <div className="APPLY">
                            <ul
                                className={`custom-dropdown-menu ${dropdownOpen.APPLY ? "show" : ""
                                    }`}
                            >
                                <div className="bt-back" >
                                    رجوع
                                </div>

                                <div container spacing={2} className="custom-dropdown-item">
                                    <div className="dis-buy">
                                        <div md={6} xs={12}>
                                            <div className="dis-paly2">
                                                <ul>
                                                    <div className="imgcon">
                                                        <h2>Elevate Your Career
                                                        </h2>
                                                        <h3>Join Our Team of Real Estate Experts Today.

                                                        </h3>
                                                    </div>
                                                    <li>
                                                        <Link to="/Careers">
                                                            CAREERS{" "}
                                                            <img src="./uploads/nav/icon/arrow.png" alt="" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link

                                                            to="/Contactus"
                                                        >
                                                            CONTACT US{" "}
                                                            <img src="./uploads/nav/icon/arrow.png" alt="" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/Login">
                                                            login{" "}
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
                                                <div className="h3">
                                                    Schedule your free 
                                                </div>
                                                <div className="h3">
                                                    consultation today
                                                </div>
                                                <div className="h4">
                                                    And our team will help you find 
                                                </div>
                                                <div className="h4">
                                                    find the ideal property for
                                                    your needs
                                                </div>
                                            </div>
                                            <FormN name={"Free consultation"} />
                                        </div>
                                    </div>
                                    <div className="imgiconstw">
                                        <div><Link target='_blank' to={"https://www.facebook.com/seattleme"}><img src="./uploads/nav/phone/icons/facebook_1384005.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.instagram.com/seattlemiddleeast/?fbclid=IwY2xjawFkoWNleHRuA2FlbQIxMAABHbgxiB-N5wvo0M_aVMOqOZWG7cJGQyl3CK-YFWuNxfRLlXngFN3m7vkvoA_aem_w5bkosDNLVblHr7i0u6AWA"}><img src="./uploads/nav/phone/icons/instagram_1384015.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.linkedin.com/company/seattleme/"}><img src="./uploads/nav/phone/icons/linkedin_1384014.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.snapchat.com/add/seattleme.ae?share_id=c1tqGvyKWo0&locale=en-US&sid=2d0fe2f3f204455983ab6558806fcd65"}><img src="./uploads/nav/phone/icons/snapchat_3669965.png" alt="face"/></Link></div>
                                        <div><Link target='_blank' to={"https://www.threads.net/@seattlemiddleeast"}><img src="./uploads/nav/phone/icons/threads.png" alt="face"/></Link></div>
                                
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

export default Navbar;
