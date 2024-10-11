import React from 'react';
import { Routes, Route, HashRouter } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import Home from './Pages/Home';
import Ourpartners from './Pages/Ourpartners';
import TeamS from './Components/abuotus/TeamS';
import TeamDetails from './Components/abuotus/TeamDetails';
import Service from './Components/service/Service';
import ServieDetails from "./Components/service/ServieDetails";
import Abudhabi from "./Components/our-project/Abudhabi";
import Mortgage from './Components/morttgage/Mortgage';
import Spartan from './Components/morttgage/Spartan';
import LatestNews from './Components/blog/LatestNews';
import Blog from './Components/blog/Blog';
import FormMS from './Components/morttgage/FormMS';
import Careers from './Components/contactus/Careers';
import Contactus from './Components/contactus/Contactus';
import Dashboard from './admin/Dashboard';
import Login from './Pages/Login';
import NotFonunt from './Pages/NotFonunt';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Formdb from './admin/pageDb/Formdb';
import Formservice from './admin/pageDb/Formservice';
import RequestQuote from './admin/pageDb/RequestQuote';
import TEameform from './admin/pageDb/TEameform';
import MasssgeUs from './admin/pageDb/MasssgeUs';
import BlogsCreat from './admin/pageDb/BlogsCreat';
import BlogsUpdete from './admin/pageDb/BlogsUpdete';
import UpdateBlog from './admin/pageDb/UpdateBlog';
import LastNews from './Components/blog/LastNews';
import Commercial from './Components/commercial/Commercial';
import SaleIn from './Components/commercial/SaleIn';
import Sell from './Components/sell/Sell';
import Cardsell from './Components/sell/Cardsell';
import Buy from './Components/buy/Buy';
import Buycards from './Components/buy/Buycards';
import Rent from './Components/RENT/Rent';
import BuyHome from './Components/buyrentareas/BuyHome';
import Developers from './Pages/Developers';
import Landingpage from './Components/landingpage/Landingpage';
import CareersForm from './Components/contactus/CareersForm';
import ContactusForm from './Components/contactus/ContactusForm';
import About from './Components/abuotus/About';
import Commercialcreat from './admin/pageDb/Commercialcreat';
import AddCategory from './admin/pageDb/AddCategory';
import Company from './Pages/Company';
import AddCateBuyLocation from './admin/pageDb/AddCateBuyLocation';
import AddCategoryBuyPlan from './admin/pageDb/AddCategoryBuyPlan';
import AddCardBuy from './admin/pageDb/AddCardBuy';
import AddDevelopers from './admin/pageDb/AddDevelopers';
import LandingPageBuy from './Components/landingpage/LandingPageBuy';
import CategoryCards from './Components/buy/CategoryCards';
import LandingPageBuyLocation from './Components/buy/LandingPageBuyLocation';
import AddCategoryRentPlan from './admin/pageDb/AddCategoryRentPlan';
import AddLocationRent from './admin/pageDb/AddLocationRent';
import CreateRentPlan from './admin/pageDb/RentDahs';
import CreateRent from './admin/pageDb/CreateRent';
import LandingPage from './Components/RENT/LandingPage';
import RentFilter from './Components/RENT/RentFilter';
import LandingPageSell from './Components/sell/LandingPageSell';
import CreateSell from './admin/pageDb/CreateSell';
import AddLocationSell from './admin/pageDb/AddLocationSell';
import AddCategorySellPlan from './admin/pageDb/AddCategorySellPlan';
import RentDahs from './admin/pageDb/RentDahs';
import BuyDahs from './admin/pageDb/BuyDahs';
import COMMERCIALDahs from './admin/pageDb/COMMERCIALDahs';
import SellDahs from './admin/pageDb/SellDahs';
import RentUpdate from './admin/pageDb/RentUpdate';
import UpdateBuy from './admin/pageDb/UpdateBuy';
import UpdateSell from './admin/pageDb/updateSell';
import UpdateRent from './admin/pageDb/RentUpdate';
import CommercialEdit from './admin/pageDb/CommercialEdit.';
import AreasDahs from './admin/pageDb/AreasDahs';
import BlogsDahs from './admin/pageDb/BlogsDahs';
import AddBanner from './admin/pageDb/AddBanner';
import DevelopersDahs from './admin/pageDb/DevelopersDahs';
import AddCartDevelopers from './admin/pageDb/AddCartDevelopers';
import CategoryDeveloper from './Pages/CategoryDeveloper';
import AddCartAreas from './admin/pageDb/AddCartAreas';
import PageAreas from './Pages/PageAreasbuy';
import PageAreasbuy from './Pages/PageAreasbuy';
import PageAreasRent from './Pages/PageAreasRent';
import AddBannerBuy from './admin/pageDb/AddBannerBuy';
import AddBannerRent from './admin/pageDb/AddBannerRent';
import AddBannerCommercial from './admin/pageDb/AddBannerCommerclal';
import AddBannerDevelopers from './admin/pageDb/AddBannerDevelopers';
import AddBannerAreas from './admin/pageDb/AddBannerAreas';
import FilterLocation from './Components/buy/FIlterLocation';
import SeattleProject from './admin/pageDb/SeattleDahs';
import SeattleDahs from './admin/pageDb/SeattleDahs';
import CreateSheattle from './admin/pageDb/CreateSheattle';
import AddCategoryShettlePlan from './admin/pageDb/AddCategoryShettlePlan';
import UpdateLocation from './admin/pageDb/UpdateLocation';
import CategoryAreas from './Components/our-project/CategoryAreas';
import LandingpageSeattle from './Components/ourprojects/LandingpageSeattle';
import CategoryOffPlanSeattle from './Components/ourprojects/CategoryOffPlanSeattle';
import SeattleUpdate from './admin/pageDb/SeattleUpdate';
import AreasCategory from './Pages/AreasCategory';

export default function App() {
    return (
        <div>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="Ourpartners" element={<Ourpartners />} />
                    <Route path="TeamS" element={<TeamS />} />
                    <Route path="TeamDetails/:Teamid" element={<TeamDetails />} />
                    <Route path="Service" element={<Service />} />
                    <Route path="ServieDetails/:Servieid" element={<ServieDetails />} />
                    <Route path="Abudhabi" element={<Abudhabi />} />
                    <Route path="Mortgage" element={<Mortgage />} />
                    <Route path="Spartan" element={<Spartan />} />
                    <Route path="Sell" element={<Sell />} />
                    <Route path="Sell/:id" element={<LandingPageSell />} />
                    <Route path="LatestNews" element={<LatestNews />} />
                    <Route path="Blog/:id" element={<Blog />} />
                    <Route path="FormMS" element={<FormMS />} />
                    <Route path="Careers" element={<Careers />} />
                    <Route path="Contactus" element={<Contactus />} />
                    <Route path="LastNews" element={<LastNews />} />
                    <Route path="SaleIn" element={<SaleIn />} />
                    <Route path="Cardsell" element={<Cardsell />} />
                    <Route path="Buy" element={<Buy />} />
                    <Route path="buy/category/:id" element={<CategoryCards />} />
                    <Route path="Buy/:id" element={<LandingPageBuy />} />
                    <Route path="Buy/Location/:id" element={<LandingPageBuyLocation />} />
                    <Route path="Buy/Category/Location/:id" element={<FilterLocation />} />

                    <Route path="BuBuycardsy" element={<Buycards />} />

                    <Route path="Rent" element={<Rent />} />
                    <Route path="Rent/:id" element={<LandingPage />} />
                    <Route path="Rent/Filter/:id" element={<RentFilter />} />
                    <Route path="Areas/Buy/category/Location/:id" element={<PageAreasbuy />} />
                    <Route path="Areas/Rent/category/Location/:id" element={<PageAreasRent />} />
                    <Route path="Areas/location/center/:id" element={<AreasCategory />} />

                    <Route path="/Areas/Category/Location/Center/:id" element={<CategoryAreas />} />
                    <Route path="BuyHome" element={<BuyHome />} />
                    <Route path="Developers/:id" element={<Developers />} />
                    <Route path="/Buy/Category/Location/:id" element={<CategoryDeveloper />} />
                    <Route path="Landingpage" element={<Landingpage />} />
                    <Route path="CareersForm" element={<CareersForm />} />
                    <Route path="ContactusForm" element={<ContactusForm />} />
                    <Route path="About" element={<About />} />
                    <Route path="*" element={<NotFonunt />} />
                    <Route path="login" element={<Login />} />
                    {/* Handle Path Commercial*/}
                    <Route path="Commercial" element={<Commercial />} />
                    <Route path="/Commercial/:id" element={<Company />} />
                    <Route path="/Commercial/:id/:id" element={<Landingpage />} />
                    <Route path="/Seattle/:id" element={<LandingpageSeattle />} />
                    <Route path="/Seattle/category/:id" element={<CategoryOffPlanSeattle />} />
                    {/* End Path Commercial */}
                    <Route path="dashboard" element={<Dashboard />} >
                        <Route index element={<Formdb />} />
                        <Route path="Formservice" element={<Formservice />} />
                        <Route path="RequestQuote" element={<RequestQuote />} />
                        <Route path="TEameform" element={<TEameform />} />
                        <Route path="MasssgeUs" element={<MasssgeUs />} />
                        <Route path="BlogsCreat" element={<BlogsCreat />} />
                        <Route path="BlogsUpdete" element={<BlogsUpdete />} />
                        <Route path="update-blog/:id" element={<UpdateBlog />} />
                        <Route path="Commercialcreat" element={<Commercialcreat />} />
                        <Route path="AddCategoryCommercial" element={<AddCategory />} />
                        <Route path="AddCategoryBuyLocation" element={<AddCateBuyLocation />} />

                        <Route path="update/Location/:id" element={<UpdateLocation />} />

                        <Route path="AddCateBuyPlan" element={<AddCategoryBuyPlan />} />
                        <Route path="AddCategory" element={<AddCategoryShettlePlan />} />

                        <Route path="AddCardBuy" element={<AddCardBuy />} />
                        <Route path="/dashboard/Developers/AddDevelopers" element={<AddDevelopers />} />
                        <Route path="AddCategoryRentPlan" element={<AddCategoryRentPlan />} />
                        <Route path="AddLocationRent" element={<AddLocationRent />} />
                        <Route path="Rent" element={<RentDahs />} />
                        <Route path="Rent/AddBannerRent" element={<AddBannerRent />} />
                        <Route path="EditRent/:id" element={<UpdateRent />} />
                        <Route path="Buy" element={<BuyDahs />} />
                        <Route path="buy/AddBannerBuy" element={<AddBannerBuy />} />
                        <Route path="EditBuy/:id" element={<UpdateBuy />} />
                        <Route path="COMMERCIAL" element={<COMMERCIALDahs />} />
                        <Route path="CommercialEdit/:id" element={<CommercialEdit />} />
                        <Route path="Commercial/AddBannerCommercial" element={<AddBannerCommercial />} />
                        <Route path="Sell" element={<SellDahs />} />
                        <Route path="EditSell/:id" element={<UpdateSell />} />
                        <Route path="CreateRent" element={<CreateRent />} />
                        <Route path="CreateSell" element={<CreateSell />} />
                        <Route path="AddLocationSell" element={<AddLocationSell />} />
                        <Route path="AddCategorySellPlan" element={<AddCategorySellPlan />} />
                        <Route path="Areas" element={<AreasDahs />} />
                        <Route path="Areas/AddBannerAreas" element={<AddBannerAreas />} />
                        <Route path="/dashboard/CreateAreas" element={<AddCartAreas />} />
                        <Route path="/dashboard/Blogs" element={<BlogsDahs />} />
                        <Route path="/dashboard/Blogs/AddBanner" element={<AddBanner />} />
                        <Route path="/dashboard/Developers" element={<DevelopersDahs />} />                                                                             
                        <Route path="/dashboard/SeattleProject" element={<SeattleDahs />} />
                        <Route path="/dashboard/CreateSeattle" element={<CreateSheattle />} />
                        <Route path="/dashboard/SeattleProject/EditSeattle/:id" element={<SeattleUpdate />} />
                        <Route path="Developers/AddBannerDevelopers" element={<AddBannerDevelopers />} />
                        <Route path="/dashboard/Developers/UpdateDevelopers/:id" element={<AddCartDevelopers />} />
                    </Route>
                </Routes>
            </HashRouter>
            <ToastContainer />
        </div >
    );
}
