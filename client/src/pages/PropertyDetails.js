import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaBed, FaBath, FaParking, FaDog, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property details');
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-red-500 text-white p-4 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Property not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-[400px] mb-4">
            <img
              src={property.photos[activeImage]}
              alt={`Property ${activeImage + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {property.photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative h-20 ${
                  activeImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img
                  src={photo}
                  alt={`Property ${index + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">
              {property.bhk} BHK {property.spaceType} in {property.locality}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <FaBed className="text-gray-400" />
                <span>{property.bhk} BHK</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaBath className="text-gray-400" />
                <span>{property.washroomType}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaParking className="text-gray-400" />
                <span>{property.carParking}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaDog className="text-gray-400" />
                <span>Pets {property.petsAllowed}</span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-4">About the Property</h2>
              <p className="text-gray-300">{property.about}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-bold mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Appliances</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    {property.appliances.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <ul className="list-disc list-inside text-gray-300">
                    {property.amenities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 p-6 rounded-lg sticky top-4">
              <div className="text-2xl font-bold text-green-500 mb-4">
                ₹{property.rent.toLocaleString()}/month
              </div>
              {property.maintenance && (
                <div className="text-gray-300 mb-4">
                  Maintenance: ₹{property.maintenance}/month
                </div>
              )}
              
              <div className="border-t border-gray-700 pt-4 mb-4">
                <h3 className="font-semibold mb-2">Property Details</h3>
                <div className="space-y-2 text-gray-300">
                  <div>Area: {property.area} sq.ft</div>
                  <div>Floor: {property.floor}</div>
                  <div>Furnishing: {property.type}</div>
                  <div>Cooling: {property.coolingFacility}</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-semibold mb-2">Owner Details</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <FaUser className="text-gray-400" />
                    <span>{property.firstName} {property.lastName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <FaPhone className="text-gray-400" />
                    <span>{property.contactNumber}</span>
                  </div>
                  {property.alternateContact && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <FaPhone className="text-gray-400" />
                      <span>{property.alternateContact}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-gray-300">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{property.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
