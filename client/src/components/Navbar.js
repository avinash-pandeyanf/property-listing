import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-teal-500">TO-LET</span>
            </Link>

          </div>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/service" className="text-gray-300 hover:text-white">Service</Link>
            <Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
            
            {user ? (
              <>
                <Link 
                  to="/add-property" 
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                >
                  Property Listing
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
