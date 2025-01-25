import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  return (
    <Link 
      to={`/property/${property._id}`} 
      className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={property.photos[0]}
          alt={`${property.spaceType} in ${property.locality}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded">
          {property.spaceType}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-gray-400 mr-1" />
          <p className="text-gray-300">{property.locality}</p>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">
          {property.bhk} BHK {property.type}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-300">
            <FaBed className="mr-1" />
            <span>{property.bhk} BHK</span>
          </div>
          <div className="flex items-center text-gray-300">
            <FaBath className="mr-1" />
            <span>{property.washroomType}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-700 pt-3">
          <div className="flex items-center text-green-500 font-bold">
            <FaRupeeSign className="mr-1" />
            <span>{property.rent.toLocaleString()}</span>
          </div>
          <span className="text-sm text-gray-400">
            {property.preference}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
