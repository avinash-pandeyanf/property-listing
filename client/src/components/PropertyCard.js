import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="block bg-gray-800 rounded p-4 text-white">
      <img
        src={property.photos[0]}
        alt={property.name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-bold mt-2">{property.name}</h3>
      <p>{property.location}</p>
      <p>₹{property.rent}</p>
    </Link>
  );
};

export default PropertyCard;
