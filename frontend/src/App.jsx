import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer.jsx";
import Experts from "./components/Experts.jsx";
import NewsLetter from "./components/NewsLetter.jsx";
import Plans from "./components/Plans.jsx";
import ListGallery from "./components/Services/ListGallery.jsx";
import Login from "./components/Login/login.jsx";
import Registration from "./components/Registration/registration.jsx";
import Booking from "./components/Booking/Booking.jsx";
import UploadForm from "./components/UploadForm"; 
import ListingDetails from "./components/ListingDetails/ListingDetails.jsx"; // Make sure to create this component

const App = () => {
  const [showListGallery, setShowListGallery] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false); 

  const handleShowListing = () => {
    setShowListGallery(true);
  };

  const handleAddListing = () => {
    setShowUploadForm(true); 
  };

  const closeUploadForm = () => {
    setShowUploadForm(false); 
  };

  return (
    <Router>
      <div className="bg-white dark:text-white duration-200 overflow-x-hidden">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/listings/:listingId" element={<ListingDetails />} />
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Experts
                  onGetStartedClick={handleShowListing}
                  onAddListingClick={handleAddListing} 
                />
                {showListGallery && <ListGallery className="fade-in" />}
                <div className="pt-5">
                  <NewsLetter />
                </div>
                <Plans />
                <Footer />

                {showUploadForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white p-6 rounded-lg max-w-xl w-full shadow-lg">
                      <button
                        onClick={closeUploadForm}
                        className="absolute top-2 right-2 text-black text-2xl font-bold hover:text-red-500"
                      >
                        ×
                      </button>
                      <UploadForm />
                    </div>
                  </div>
                )}
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;