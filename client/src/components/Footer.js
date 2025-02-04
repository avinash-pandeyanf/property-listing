import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4 text-teal-500">REACH US</h3>
          <div className="space-y-2">
            <p>+91-8707727347</p>
            <p>hello@toletglobe.in</p>
            <p>D1/122 Vipulkhand, Gomtinagar</p>
            <p>Lucknow, Uttar Pradesh</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-teal-500">QUICK LINKS</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-teal-500">Home</Link></li>
            {/* Remove Blog link if no backend route exists */}
            {/* <li><Link to="/blog" className="hover:text-teal-500">Blog</Link></li> */}
            <li><Link to="/properties" className="hover:text-teal-500">Property</Link></li> 
          </ul>
        </div>


        {/* Remove Services section completely as there are no backend routes */}
        {/* Could be added back if those features are implemented */}

        <div>
          <h2 className="text-2xl font-bold text-teal-500 mb-4">To-Let Globe</h2>
          <p className="text-sm">One-stop solution for all your brokerage-free rental needs</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center">
        <p> 2025 To-Let Globe -- Lucknow</p>
      </div>
    </footer>
  );
};

export default Footer;