import React from 'react';
import PropertyCard from '../components/PropertyCard';

const HomePage = () => {
  // Placeholder data
  const properties = [
    { id: 1, title: "Modern Apartment", location: "New York", price: 2000, image: "https://via.placeholder.com/150" },
    { id: 2, title: "Cozy House", location: "Los Angeles", price: 1800, image: "https://via.placeholder.com/150" },
    { id: 3, title: "Spacious Villa", location: "Miami", price: 3500, image: "https://via.placeholder.com/150" },
    // Add more properties here
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="p-4 bg-gray-900 text-center text-2xl font-bold">Your Properties</header>
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
