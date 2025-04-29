import Logo from "../../assets/logo2.png";
import Profile from "../../assets/profile_logo.png";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = [
  { id: 1, name: "HOME", link: "/", isActive: false },
  { id: 2, name: "SERVICES", link: "/#services", isActive: false },
  { id: 3, name: "ABOUT", link: "/#about", isActive: false },
  { id: 4, name: "BOOKING", link: "/#booking", isActive: false },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (link) => {
    return location.pathname === link || location.hash === link;
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-sm border-b border-gray-700"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo (Left) */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-12 hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Centered Menu (Desktop) */}
        <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-12">
            {Menu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className={`relative font-bold text-white hover:text-white transition-colors text-[17px] tracking-wider ${
                    isActiveLink(menu.link)
                      ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-400 after:animate-underline"
                      : "hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-blue-400/50 hover:after:animate-underline"
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile (Right) */}
        <div className="flex items-center">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-white text-[15px] font-bold hidden sm:block">
                {user.name || `ID: ${user.user_id}`}
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-400/40 flex items-center justify-center overflow-hidden">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-blue-300 font-bold text-lg">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1 group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-700/50 border-2 border-gray-600/60 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:border-blue-400/40 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300 group-hover:text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={2}
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
          <ul className="px-6 py-4 space-y-5">
            {Menu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  onClick={toggleMenu}
                  className={`block py-3 px-4 rounded-lg transition-colors text-[17px] font-bold tracking-wider ${
                    isActiveLink(menu.link)
                      ? "bg-blue-500/10 text-blue-300 border-l-4 border-blue-400"
                      : "text-white hover:bg-gray-800/50"
                  }`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={user ? "/profile" : "/login"}
                onClick={toggleMenu}
                className="block py-3 px-4 rounded-lg text-white hover:bg-gray-800/50 transition-colors text-[17px] font-bold tracking-wider"
              >
                {user ? "MY ACCOUNT" : "SIGN IN"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;