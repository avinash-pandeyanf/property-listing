import React, { useState } from 'react';
import { FaTrash, FaImage } from 'react-icons/fa';

const PhotoUpload = ({ photos, onChange, minPhotos = 5 }) => {
  const [error, setError] = useState('');

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        newPhotos.push(file);
      }
    });

    if (newPhotos.length > 10) {
      setError('Maximum 10 photos allowed');
      return;
    }

    setError('');
    onChange(newPhotos);
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange(newPhotos);
  };

  return (
    <div className="mb-6">
      <label className="block text-gray-400 mb-2">
        Photos <span className="text-red-500">*</span>
        <span className="text-sm ml-2">(Minimum {minPhotos} photos required)</span>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={URL.createObjectURL(photo)}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removePhoto(index)}
              className="absolute top-2 right-2 bg-red-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTrash className="text-white" />
            </button>
          </div>
        ))}

        {photos.length < 10 && (
          <label className="border-2 border-dashed border-gray-600 rounded-lg h-32 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <FaImage className="text-gray-400 text-3xl mb-2" />
            <span className="text-gray-400 text-sm">Add Photo</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {photos.length < minPhotos && (
        <p className="text-red-500 text-sm">Please add at least {minPhotos} photos</p>
      )}
    </div>
  );
};

export default PhotoUpload;
