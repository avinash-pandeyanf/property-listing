import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaShareAlt, FaHeart, FaVideo, FaFilter } from 'react-icons/fa';

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCity, setSelectedCity] = useState('all');
  const [sort, setSort] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    bhk: [],
    residential: [],
    commercial: [],
    type: ''
  });

  const fetchProperties = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties?page=${page}&city=${selectedCity}&sort=${sort}`
      );
      const data = await response.json();
      setProperties(data.properties || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }, [page, selectedCity, sort]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (filterType, value) => {
    setPage(1); // Reset to first page when changing filters
    switch (filterType) {
      case 'city':
        setSelectedCity(value);
        break;
      case 'sort':
        setSort(value);
        break;
      default:
        break;
    }
  };

  const handleBHKChange = (bhk) => {
    setFilters(prev => ({
      ...prev,
      bhk: prev.bhk.includes(bhk) 
        ? prev.bhk.filter(b => b !== bhk)
        : [...prev.bhk, bhk]
    }));
  };

  const handleResidentialChange = (type) => {
    setFilters(prev => ({
      ...prev,
      residential: prev.residential.includes(type)
        ? prev.residential.filter(t => t !== type)
        : [...prev.residential, type]
    }));
  };

  const handleCommercialChange = (type) => {
    setFilters(prev => ({
      ...prev,
      commercial: prev.commercial.includes(type)
        ? prev.commercial.filter(t => t !== type)
        : [...prev.commercial, type]
    }));
  };

  const handleFurnishingChange = (type) => {
    setFilters(prev => ({
      ...prev,
      type: type
    }));
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500">Property Listing</h1>
          <div className="flex gap-4">
            <div className="relative">
              <select
                className="bg-gray-800 text-white px-4 py-2 rounded"
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                value={sort}
              >
                <option value="date">Sort</option>
                <option value="cost_low">Price Low to High</option>
                <option value="cost_high">Price High to Low</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
            <div className="relative">
              <button
                className="bg-gray-800 text-white px-4 py-2 rounded flex items-center"
                onClick={() => setSelectedCity('all')}
              >
                Select City <span className="ml-2">▼</span>
              </button>
            </div>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="mr-2" /> Filters ({Object.values(filters).flat().length})
            </button>
            <div className="bg-gray-800 text-white px-4 py-2 rounded">
              Visit <span className="bg-yellow-500 text-black px-2 rounded">0</span>
            </div>
            <Link
              to="/add-property"
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Add a property
            </Link>
          </div>
        </div>

        {/* Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">All Filters</h2>
                <button onClick={() => setShowFilters(false)}>&times;</button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">BHK</h3>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map(bhk => (
                      <button
                        key={bhk}
                        className={`px-3 py-1 rounded ${
                          filters.bhk.includes(bhk)
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-200'
                        }`}
                        onClick={() => handleBHKChange(bhk)}
                      >
                        {bhk} BHK
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Residential</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['Flat', 'House', 'Villa'].map(type => (
                      <button
                        key={type}
                        className={`px-3 py-1 rounded ${
                          filters.residential.includes(type)
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-200'
                        }`}
                        onClick={() => handleResidentialChange(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Commercial</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['Office', 'Shop', 'Warehouse'].map(type => (
                      <button
                        key={type}
                        className={`px-3 py-1 rounded ${
                          filters.commercial.includes(type)
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-200'
                        }`}
                        onClick={() => handleCommercialChange(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Furnishing Type</h3>
                  <div className="flex gap-2">
                    <select
                      className="w-full p-2 border rounded"
                      value={filters.type}
                      onChange={(e) => handleFurnishingChange(e.target.value)}
                    >
                      <option value="">Select Type</option>
                      <option value="Fully Furnished">Fully Furnished</option>
                      <option value="Semi Furnished">Semi Furnished</option>
                      <option value="Non Furnished">Non Furnished</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    className="w-full py-2 bg-gray-200 rounded"
                    onClick={() => setFilters({
                      bhk: [],
                      residential: [],
                      commercial: [],
                      type: ''
                    })}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full py-2 bg-teal-500 text-white rounded"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property._id} className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="relative">
                <img
                  src={property.photos[0]}
                  alt={property.title}
                  className="w-full h-48 object-cover"
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
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-500 text-white px-2 py-1 rounded text-sm">
                    Available
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center text-yellow-500 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{property.locality}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {property.spaceType} for Rent
                </h3>
                <p className="text-gray-400 mb-4">{property.address}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-yellow-500">
                    ₹{property.rent}/month
                  </span>
                  <Link
                    to={`/property/${property._id}`}
                    className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              disabled={page === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 rounded ${
                  pageNum === page
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {pageNum}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              disabled={page === totalPages}
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
