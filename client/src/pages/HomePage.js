import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaShareAlt, FaHeart, FaVideo, FaSearch } from 'react-icons/fa';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    city: 'all',
    sort: 'date',
    locality: '',
    bhk: [],
    spaceType: [],
    furnishingType: '',
    minRent: '',
    maxRent: '',
  });

  useEffect(() => {
    fetchProperties();
  }, [filters, page]);

  const fetchProperties = async () => {
    try {
      setError(null);
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      queryParams.append('sort', filters.sort);
      
      if (filters.city !== 'all') queryParams.append('city', filters.city);
      if (filters.locality) queryParams.append('locality', filters.locality);
      if (filters.bhk.length) queryParams.append('bhk', filters.bhk.join(','));
      if (filters.spaceType.length) queryParams.append('spaceType', filters.spaceType.join(','));
      if (filters.furnishingType) queryParams.append('type', filters.furnishingType);
      if (filters.minRent) queryParams.append('minRent', filters.minRent);
      if (filters.maxRent) queryParams.append('maxRent', filters.maxRent);

      const response = await fetch(`/api/properties?${queryParams}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.text();
        try {
          const jsonError = JSON.parse(errorData);
          throw new Error(jsonError.message || 'Failed to fetch properties');
        } catch (e) {
          throw new Error(errorData || 'Failed to fetch properties');
        }
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response from server');
      }

      const data = await response.json();
      if (!data || !data.data) {
        throw new Error('Invalid response format');
      }

      setProperties(data.data.properties || []);
      setTotalPages(data.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const renderPropertyCard = (property) => (
    <div key={property._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <div className="absolute top-2 left-2 bg-teal-500 text-white px-2 py-1 rounded text-sm">
          Available
        </div>
        <div className="relative group">
          <img
            src={property.photos[0]}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 left-2 flex items-center text-white">
            <FaMapMarkerAlt className="mr-1" />
            <span>{property.locality}</span>
            {property.videoUrl && (
              <div className="ml-2 flex items-center">
                <FaVideo className="mr-1" />
                <span>{property.photos.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {property.bhk} BHK {property.spaceType}
            </h3>
            <p className="text-gray-600">On Rent</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <FaShareAlt />
            </button>
            <button className="text-gray-500 hover:text-red-500">
              <FaHeart />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-gray-800 font-semibold">
            ₹ {property.rent.toLocaleString()}
          </p>
          <div className="text-sm text-gray-500 mt-1">
            {property.views || 0} views
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8">Property Listing</h1>
        
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 flex space-x-2">
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="bg-white text-gray-800 px-4 py-2 rounded-l-lg w-40"
            >
              <option value="all">Select Your City</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
            </select>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={filters.locality}
                onChange={(e) => handleFilterChange('locality', e.target.value)}
                placeholder="Search by locality or area..."
                className="w-full px-4 py-2 pr-10 text-gray-800 rounded-r-lg focus:outline-none"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              <option value="date">Sort</option>
              <option value="cost_low">Price Low to High</option>
              <option value="cost_high">Price High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>

            <Link
              to="/add-property"
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Add a property
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="text-xl mb-2">No properties found</p>
            <p>Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {properties.map(renderPropertyCard)}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-800 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
