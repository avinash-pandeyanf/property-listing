import React from "react";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import placeholder from './placeholder.jpg'; // Import the placeholder image


const PropertyCard = ({ property }) => {
  const imageUrl = property.photos && property.photos.length > 0 ? property.photos[0] : placeholder;

  return (
    <Link to={`/property/${property._id}`} className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={imageUrl} alt={property.locality || "Property"} className="w-full h-48 object-cover" /> {/* Provide default alt text */}
      <div className="p-4">
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-gray-400 mr-1" />
          <p className="text-gray-300">{property.locality || "Unknown Location"}</p> {/* Handle missing locality */}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{property.bhk} BHK {property.type || ""}</h3> {/* Handle missing type */}
        <div className="flex items-center justify-between mb-3">
          {/* ... other details (using optional chaining and default values where needed) */}
          <div className="flex items-center text-gray-300">
            <FaBath className="mr-1" />
            <span>{property.typeOfWashroom || ""}</span> </div> {/* Provide default/fallback values */}
        </div>
        <div className="flex items-center justify-between border-t border-gray-700 pt-3">
          <div className="flex items-center text-green-500 font-bold">
            <FaRupeeSign className="mr-1" />
            <span>{(property.subscriptionAmount && property.subscriptionAmount.toLocaleString()) || ""}</span> {/* Use optional chaining */}
          </div>
          <span className="text-sm text-gray-400">{property.preference || ""}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
