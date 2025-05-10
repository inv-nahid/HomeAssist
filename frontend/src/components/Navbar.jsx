import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <rect width="40" height="40" rx="12" fill="#EC4899"/>
              <path d="M12 24V18.5L20 13L28 18.5V24C28 25.1046 27.1046 26 26 26H14C12.8954 26 12 25.1046 12 24Z" fill="white"/>
              <rect x="17" y="21" width="6" height="5" rx="1" fill="#EC4899"/>
            </svg>
            <span className="text-2xl font-bold text-pink-600">
              HomeAssist
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;