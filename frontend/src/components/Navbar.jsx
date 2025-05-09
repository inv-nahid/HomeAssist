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
            <div className="w-10 h-10 bg-pink-500 rounded-full"></div>
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