import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState("date");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/properties?page=${page}&sort=${sortOption}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties((prev) => [...prev, ...data.properties]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, sortOption]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setProperties([]); // Reset properties when sorting changes
    setPage(1); // Reset to first page
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="p-4 bg-gray-900 text-center text-2xl font-bold">Your Properties</header>
      <main className="p-4">
        <div className="mb-4">
          <label htmlFor="sort" className="mr-2">Sort By:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 bg-gray-700 text-white rounded"
          >
            <option value="date">Date Uploaded</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        {loading && <p>Loading...</p>}
        {!loading && (
          <button
            onClick={handleLoadMore}
            className="mt-4 p-2 bg-yellow-500 text-black font-bold rounded"
          >
            Load More
          </button>
        )}
      </main>
    </div>
  );
};

export default HomePage;
