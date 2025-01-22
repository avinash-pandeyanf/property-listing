import React from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <div className="bg-black text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold">Property Details</h1>
      <p>Displaying details for property ID: {id}</p>
      {/* Add more detailed content here */}
    </div>
  );
};

export default PropertyDetails;
