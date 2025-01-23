import React, { useState } from "react";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    alternateContact: "",
    locality: "",
    address: "",
    spaceType: "Flat",
    petsAllowed: "No",
    preference: "Family",
    type: "Semi Furnished",
    bhk: "1",
    floor: "",
    landmark: "",
    washroomType: "Western",
    coolingFacility: "Fan",
    carParking: "Yes",
    rent: "",
    maintenance: "",
    area: "",
    appliances: [],
    amenities: [],
    about: "",
    photos: [],
  });

  const [photosPreview, setPhotosPreview] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, photos: files });

    const preview = files.map((file) => URL.createObjectURL(file));
    setPhotosPreview(preview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for backend submission
    console.log(formData);
    alert("Property submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Add New Property</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Locality</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Space Type</label>
            <select
              name="spaceType"
              value={formData.spaceType}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-800 rounded"
            >
              <option value="Flat">Flat</option>
              <option value="House">House</option>
              <option value="PG">PG</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Office">Office</option>
              <option value="Shop">Shop</option>
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1">Photos (Minimum 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-800 rounded"
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {photosPreview.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
