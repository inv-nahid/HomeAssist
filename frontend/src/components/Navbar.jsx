import { Link } from "react-router-dom";
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full"></div>
            <span className="text-2xl font-bold text-blue-600">
              HomeAssist
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-gray-600 hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/services" className="font-medium text-gray-600 hover:text-blue-600 transition">
              Services
            </Link>
            <Link to="/about" className="font-medium text-gray-600 hover:text-blue-600 transition">
              About
            </Link>
            <Link to="/login" className="font-medium text-gray-600 hover:text-blue-600 transition">
              Login
            </Link>
            <Link to="/register" className="font-medium text-gray-600 hover:text-blue-600 transition">
              Register
            </Link>
            <Link to="/dashboard" className="font-medium text-gray-600 hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link 
              to="/book-now" 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
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
              <Link to="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                Login
              </Link>
              <Link to="/register" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                Register
              </Link>
              <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded" onClick={toggleMobileMenu}>
                Dashboard
              </Link>
              <Link 
                to="/book-now" 
                className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" 
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