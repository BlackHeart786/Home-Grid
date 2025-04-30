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

const App = () => {
  const [showListGallery, setShowListGallery] = useState(false);

  const handleGetStartedClick = () => {
    setShowListGallery(true);
  };

  return (
    <Router>
      <div className="bg-white dark:text-white duration-200 overflow-x-hidden">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/booking" element={<Booking />} />

          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Experts onGetStartedClick={handleGetStartedClick} />
                {showListGallery && <ListGallery className="fade-in" />}
                <div className="pt-5">
                  <NewsLetter />
                </div>
                <Plans />
                <Footer />
              </>
            }
          />

          {/* Redirect for unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
