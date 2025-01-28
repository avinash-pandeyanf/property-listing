import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCamera, FaShareAlt, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("date");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/properties?page=${page}&limit=6${sortOption ? `&sort=${sortOption}` : ''}${selectedCity ? `&city=${selectedCity}` : ''}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        
        const data = await response.json();
        
        if (page === 1) {
          setProperties(data.properties);
        } else {
          setProperties(prev => [...prev, ...data.properties]);
        }
        
        setHasMore(data.properties.length === 6);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, sortOption, selectedCity]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setProperties([]);
    setPage(1);
    setHasMore(true);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setProperties([]);
    setPage(1);
    setHasMore(true);
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-black rounded-lg overflow-hidden">
      <div className="relative">
        <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-md z-10">
          Available
        </div>
        <div className="relative h-64">
          <img
            src={property.photos[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-white">
            <FaMapMarkerAlt />
            <span>{property.locality}</span>
            <FaCamera />
            <span>{property.photos.length}</span>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="p-2 bg-white rounded-full shadow-lg">
              <FaShareAlt className="text-gray-700" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-lg">
              <FaHeart className="text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {property.bhk} BHK, {property.type}, On Rent
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-yellow-500">RS. {property.price}</p>
          <div className="flex space-x-2">
            <button className="p-1">
              <FaShareAlt className="text-gray-400" />
            </button>
            <button className="p-1">
              <FaHeart className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none bg-white text-black px-4 py-2 pr-8 rounded"
              >
                <option value="">Sort</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="date">Latest</option>
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Select City"
                value={selectedCity}
                onChange={handleCityChange}
                className="bg-white text-black px-4 py-2 rounded"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-700 text-white px-6 py-2 rounded">
              Visit <span className="bg-yellow-500 text-black px-2 rounded ml-2">{visitCount}</span>
            </button>
            <Link to="/add-property" className="bg-white text-black px-6 py-2 rounded">
              Add a property
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        )}

        {!loading && hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 p-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-teal-500">REACH US</h3>
            <p>+91-8707727347</p>
            <p>hello@toletglobe.in</p>
            <p>D1/122 Vipulkhand, Gomtinagar</p>
            <p>Lucknow, Uttar Pradesh</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-teal-500">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>Home</li>
              <li>Blog</li>
              <li>Property</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-teal-500">SERVICES</h3>
            <ul className="space-y-2">
              <li>Paying Guest</li>
              <li>Flat and House</li>
              <li>Office</li>
              <li>Shops and Godown</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p> 2023 To-Let Globe -- Lucknow</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
