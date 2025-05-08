import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to login page
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-pink-500 rounded-full"></div>
            <span className="text-2xl font-bold text-pink-600">
              HomeAssist
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-600 hover:text-pink-600 transition">
              Home
            </Link>
            <Link to="/services" className="font-medium text-gray-600 hover:text-pink-600 transition">
              Services
            </Link>
            <Link to="/about" className="font-medium text-gray-600 hover:text-pink-600 transition">
              About
            </Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="font-medium text-gray-600 hover:text-pink-600 transition">
                  Login
                </Link>
                <Link to="/register" className="font-medium text-gray-600 hover:text-pink-600 transition">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="font-medium text-gray-600 hover:text-pink-600 transition">
                  Dashboard
                </Link>
                <Link to="/profile" className="font-medium text-gray-600 hover:text-pink-600 transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-medium text-gray-600 hover:text-pink-600 transition"
                >
                  Logout
                </button>
              </>
            )}
            <Link 
              to="/book-now" 
              className="px-6 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="focus:outline-none">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} mt-2 space-y-2 bg-white shadow-md rounded-lg p-4 absolute right-6`}>
              <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                Home
              </Link>
              <Link to="/services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                Services
              </Link>
              <Link to="/about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                About
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Logout
                  </button>
                </>
              )}
              <Link 
                to="/book-now" 
                className="block px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700" 
                onClick={toggleMobileMenu}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;