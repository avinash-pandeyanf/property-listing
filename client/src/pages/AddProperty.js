import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ownersContactNumber: '',
    ownersAlternateNumber: '',
    locality: '',
    address: '',
    spaceType: '',
    petsAllowed: false,
    preference: '',
    bachelors: '',
    type: '',
    rent: '',
    squareFeet: '',
    description: '',
    amenities: [],
    photos: [],
    videoUrl: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, value]
        : prev.amenities.filter(item => item !== value)
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    // Here you would typically upload these files to a server/cloud storage
    // For now, we'll just store them locally
    setFormData(prev => ({
      ...prev,
      photos: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to add a property');
      }

      // Create FormData to handle file uploads
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'photos') {
          formData[key].forEach(photo => {
            formDataToSend.append('photos', photo);
          });
        } else if (key === 'amenities') {
          formDataToSend.append('amenities', JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add property');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Add New Property</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Contact Number</label>
              <input
                type="tel"
                name="ownersContactNumber"
                value={formData.ownersContactNumber}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Alternate Number</label>
              <input
                type="tel"
                name="ownersAlternateNumber"
                value={formData.ownersAlternateNumber}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Locality</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded"
              rows="3"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Space Type</label>
              <select
                name="spaceType"
                value={formData.spaceType}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="PG">PG</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Office">Office</option>
                <option value="Shop">Shop</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Furnishing Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              >
                <option value="">Select Furnishing</option>
                <option value="Semi Furnished">Semi Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Non Furnished">Non Furnished</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 mb-2">Monthly Rent (₹)</label>
              <input
                type="number"
                name="rent"
                value={formData.rent}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Area (sq ft)</label>
              <input
                type="number"
                name="squareFeet"
                value={formData.squareFeet}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Preference</label>
            <select
              name="preference"
              value={formData.preference}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded"
              required
            >
              <option value="">Select Preference</option>
              <option value="Family">Family</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Any">Any</option>
            </select>
          </div>

          {formData.preference === 'Bachelors' && (
            <div>
              <label className="block text-gray-400 mb-2">Bachelor Type</label>
              <select
                name="bachelors"
                value={formData.bachelors}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white px-4 py-2 rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-gray-400 mb-2">Pets Allowed</label>
            <input
              type="checkbox"
              name="petsAllowed"
              checked={formData.petsAllowed}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-white">Yes</span>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Property Photos</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Video URL (optional)</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white px-4 py-2 rounded"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-teal-500 text-white py-3 rounded-lg font-semibold ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'
            }`}
          >
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
