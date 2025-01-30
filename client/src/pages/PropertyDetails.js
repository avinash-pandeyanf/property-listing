import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaShareAlt, FaHeart, FaVideo } from 'react-icons/fa';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch property details');
        }
        
        setProperty(data.property);
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500">{error}</div>
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
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
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
              <span>{property.location}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">{property.title}</h1>
            <p className="text-gray-400 mb-6">{property.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Details</h2>
                <div className="space-y-2 text-gray-400">
                  <p>Type: {property.type}</p>
                  <p>Price: ₹{property.price}</p>
                  <p>Area: {property.area} sq ft</p>
                  <p>Bedrooms: {property.bedrooms}</p>
                  <p>Bathrooms: {property.bathrooms}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-2 text-gray-400">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">•</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Owner</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span className="text-white">{property.owner.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-white">{property.owner.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{property.owner.email}</span>
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
