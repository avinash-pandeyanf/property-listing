import React, { useState, useEffect } from 'react';
const API_URL = process.env.REACT_APP_API_URL || 'https://property-listing-0m2j.onrender.com/api';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaShareAlt, FaHeart, FaVideo, FaParking, FaPaw, FaFan, FaToilet, FaRulerCombined } from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${API_URL}/properties/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch property details');
        }
        
        setProperty(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);


  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.photos.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 bg-red-100 p-4 rounded">{error}</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Property not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96">
            <img
              src={property.photos[currentImageIndex]}
              alt={`Property view ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              →
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <FaHeart className="text-red-500" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <FaShareAlt className="text-gray-700" />
              </button>
              {property.videoUrl && (
                <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                  <FaVideo className="text-gray-700" />
                </button>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="p-8">
            <div className="flex items-center text-yellow-500 mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <span>{property.locality}, {property.address}</span>
            </div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {property.bhk} BHK {property.spaceType}
                </h1>
                <p className="text-xl text-yellow-500">₹{property.rent.toLocaleString()}/month</p>
                {property.maintenance > 0 && (
                  <p className="text-gray-400">Maintenance: ₹{property.maintenance}/month</p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-gray-400 mb-2">
                  <FaRulerCombined className="mr-2" />
                  <span>{property.squareFeet} sq.ft</span>
                </div>
                <div className="flex space-x-4">
                  {property.carParking && (
                    <div className="flex items-center text-gray-400">
                      <FaParking className="mr-1" />
                      <span>Parking</span>
                    </div>
                  )}
                  {property.petsAllowed && (
                    <div className="flex items-center text-gray-400">
                      <FaPaw className="mr-1" />
                      <span>Pet Friendly</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Property Details</h2>
                <div className="space-y-3 text-gray-400">
                  <p>Floor: {property.floor}</p>
                  <p>Furnishing: {property.type}</p>
                  <p>Washroom: {property.typeOfWashroom}</p>
                  <p>Cooling: {property.coolingFacility}</p>
                  <p>Preferred Tenants: {property.preference}</p>
                  {property.preference === 'Bachelors' && (
                    <p>Bachelor Type: {property.bachelors}</p>
                  )}
                  <p>Landmark: {property.nearestLandmark}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Amenities & Appliances</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h3 className="text-yellow-500 mb-2">Amenities</h3>
                    <div className="space-y-2 text-gray-400">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-yellow-500 mb-2">Appliances</h3>
                    <div className="space-y-2 text-gray-400">
                      {property.appliances.map((appliance, index) => (
                        <div key={index} className="flex items-center">
                          <span className="mr-2">•</span>
                          {appliance}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {property.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">About the Property</h2>
                <p className="text-gray-400">{property.description}</p>
              </div>
            )}

            {/* Contact Section */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Owner</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <p className="text-white">{property.firstName} {property.lastName}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Primary Contact:</span>
                    <p className="text-white">{property.ownersContactNumber}</p>
                  </div>
                  {property.ownersAlternateNumber && (
                    <div>
                      <span className="text-gray-400">Alternate Contact:</span>
                      <p className="text-white">{property.ownersAlternateNumber}</p>
                    </div>
                  )}
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
