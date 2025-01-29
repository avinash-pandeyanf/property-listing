import React, { useState } from "react";
import { FaCamera, FaMapMarkerAlt, FaShareAlt, FaHeart } from "react-icons/fa";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    locality: "",
    price: "",
    type: "House",
    bhk: "2",
    photos: [],
    description: "",
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
    // Will implement backend submission later
    console.log(formData);
    alert("Property submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select className="appearance-none bg-white text-black px-4 py-2 pr-8 rounded">
                <option>Sort</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Latest</option>
              </select>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Select City"
                className="bg-white text-black px-4 py-2 rounded"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-700 text-white px-6 py-2 rounded">
              Visit <span className="bg-yellow-500 text-black px-2 rounded ml-2">0</span>
            </button>
            <button className="bg-white text-black px-6 py-2 rounded">
              Add a property
            </button>
          </div>
        </div>

        {/* Property Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">Property Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 rounded text-white"
                placeholder="e.g., 2 BHK House, On Rent"
              />
            </div>
            <div>
              <label className="block mb-2">Locality</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  className="w-full p-2 pl-10 bg-gray-800 rounded text-white"
                  placeholder="e.g., Gomti Nagar, Lucknow"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 rounded text-white"
                placeholder="e.g., 16000"
              />
            </div>
            <div>
              <label className="block mb-2">Property Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-800 rounded text-white"
              >
                <option value="House">House</option>
                <option value="Flat">Flat</option>
                <option value="PG">PG</option>
              </select>
            </div>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block mb-2">Photos</label>
            <div className="border-2 border-dashed border-gray-600 p-4 rounded-lg">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="photos"
              />
              <label
                htmlFor="photos"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <FaCamera className="text-4xl mb-2 text-gray-400" />
                <span className="text-gray-400">Upload Photos (Minimum 5)</span>
              </label>
            </div>
            {photosPreview.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {photosPreview.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Preview ${index}`}
                      className="w-full h-48 object-cover rounded"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button className="p-2 bg-white rounded-full shadow-lg">
                        <FaShareAlt className="text-gray-700" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg">
                        <FaHeart className="text-gray-700" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center space-x-2">
                      <FaCamera className="text-white" />
                      <span className="text-white bg-black bg-opacity-50 px-2 rounded">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white font-bold rounded hover:bg-teal-600 transition-colors"
          >
            Submit Property
          </button>
        </form>
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

export default AddProperty;
