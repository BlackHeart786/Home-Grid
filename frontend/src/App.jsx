import { useState } from "react";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Footer from "./components/Footer/Footer.jsx";
import Experts from "./components/Experts.jsx";
import NewsLetter from "./components/NewsLetter.jsx";
import Plans from "./components/Plans.jsx";
import ListGallery from "./components/Services/ListGallery.jsx";

const App = () => {
  const [showListGallery, setShowListGallery] = useState(false);

  const handleGetStartedClick = () => {
    setShowListGallery(true);
  };

  return (
    <div className="bg-white dark:text-white duration-200 overflow-x-hidden">
      <Hero />
      <Services />
      <Experts onGetStartedClick={handleGetStartedClick} />

      {/* Show ListGallery directly when showListGallery is true */}
      {showListGallery && <ListGallery className="fade-in" />}

      <div className="pt-5">
        <NewsLetter />
      </div>
      <Plans />
      <Footer />
    </div>
  );
};

export default App;
