import Logo from "../../assets/logo2.png";
import Profile from "../../assets/profile_logo.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = [
  { id: 1, name: "Home", link: "/", isActive: false },
  { id: 2, name: "Services", link: "/#services", isActive: false },
  { id: 3, name: "About", link: "/#about", isActive: false },
  { id: 4, name: "Booking", link: "/#booking", isActive: false },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Function to check if the current location matches the menu link
  const isActiveLink = (link) => {
    return location.pathname === link || location.hash === link;
  };

  return (
    <div className="text-white bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto py-4 flex justify-between items-center">
        {/* Logo Section with Animation */}
        <div data-aos="fade-down" data-aos-once="true">
          <a href="#" className="font-bold flex items-center gap-2">
            <img
              src={Logo}
              alt="Logo"
              className="w-30 h-14 transition-all duration-500 transform hover:scale-110 hover:rotate-6"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {Menu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className={`text-lg text-white py-2 px-4 rounded-lg transition-all duration-300 hover:text-black hover:bg-blue-500 hover:scale-105 ${
                    isActiveLink(menu.link)
                      ? "bg-blue-700 text-white rounded-md scale-105"
                      : "hover:bg-blue-400"
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          <a href="/login">
            <img
              src={Profile}
              alt="Profile"
              className="w-14 h-14 rounded-full transition-transform duration-500 ease-in-out transform hover:scale-110 hover:shadow-2xl hover:border-2 hover:border-blue-600"
            />
          </a>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <button className="text-white text-2xl" onClick={toggleMenu}>
            {isMobileMenuOpen ? "✖️" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation with Sliding Drawer */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-black bg-opacity-80 text-white py-4 px-6 absolute w-full left-0 top-full transition-all duration-300 ease-in-out transform z-10">
          <ul className="space-y-6">
            {Menu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className={`block text-lg text-white py-3 px-4 transition-all duration-300 hover:bg-blue-500 hover:scale-105 ${
                    isActiveLink(menu.link)
                      ? "bg-blue-700 text-white rounded-md scale-105"
                      : "hover:bg-blue-400"
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
