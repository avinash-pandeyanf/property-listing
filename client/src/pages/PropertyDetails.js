import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setProperty(data.property);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!property) return null;

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="p-4 bg-gray-900 text-center text-2xl font-bold">
        {property.name || "Property Details"}
      </header>
      <main className="p-4">
        <div className="mb-4">
          <img
            src={property.photos[0]}
            alt={property.name}
            className="w-full h-64 object-cover rounded"
          />
        </div>
        <div className="text-lg">
          <p><strong>Owner's Name:</strong> {property.ownerName}</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Rent:</strong> ₹{property.rent}</p>
          <p><strong>About:</strong> {property.about}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {property.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Property ${index}`}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
