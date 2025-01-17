import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-gray-800 p-4 rounded shadow-lg">
      <img
        src={property.image || "https://via.placeholder.com/150"}
        alt={property.title}
        className="w-full h-32 object-cover rounded"
      />
      <h2 className="mt-2 text-lg font-semibold">{property.title}</h2>
      <p className="text-sm text-gray-400">Location: {property.location}</p>
      <p className="text-sm text-gray-400">Price: ${property.price}</p>
      <Link to={`/property/${property.id}`} className="mt-2 w-full bg-yellow-500 text-black font-bold py-1 rounded block text-center">
        View Details
      </Link>
    </div>
  );
};

export default PropertyCard;
