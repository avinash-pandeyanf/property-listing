import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-teal-500">To-Let Globe</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-teal-500">Home</Link>
          <Link to="/services" className="hover:text-teal-500">Service</Link>
          <Link to="/blog" className="hover:text-teal-500">Blog</Link>
          <Link to="/contact" className="hover:text-teal-500">Contact</Link>
          <Link to="/about" className="hover:text-teal-500">About Us</Link>
          <Link to="/properties" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">
            Property Listing
          </Link>
          <Link to="/login" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
