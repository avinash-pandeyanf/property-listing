import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("date");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/properties?page=${page}&sort=${sortOption}&limit=6`
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
  }, [page, sortOption]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setProperties([]); // Reset properties when sorting changes
    setPage(1); // Reset to first page
    setHasMore(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available Properties</h1>
          <div className="flex items-center space-x-4">
            <label htmlFor="sort" className="text-gray-300">Sort By:</label>
            <select
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Latest First</option>
              <option value="cost_low">Price: Low to High</option>
              <option value="cost_high">Price: High to Low</option>
              <option value="popularity">Most Viewed</option>
            </select>
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!loading && hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && properties.length > 0 && (
          <p className="text-center text-gray-400 mt-8">
            No more properties to load
          </p>
        )}

        {!loading && properties.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            No properties found
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
