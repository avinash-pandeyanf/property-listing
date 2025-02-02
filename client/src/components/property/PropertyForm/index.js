import React from 'react';
import MultiSelect from '../../common/MultiSelect';
import PhotoUpload from '../../common/PhotoUpload';
import { validatePropertyForm } from '../../../utils/validation';
import {
  SPACE_TYPES,
  PREFERENCES,
  BACHELOR_TYPES,
  FURNISHING_TYPES,
  BHK_OPTIONS,
  WASHROOM_TYPES,
  COOLING_TYPES,
  APPLIANCES,
  AMENITIES
} from '../../../utils/constants';

const PropertyForm = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    const newErrors = validatePropertyForm(newData);
    setErrors(newErrors);
  };

  return (
    <form className="space-y-6">
      {/* Owner Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Owner Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <input
            type="tel"
            placeholder="Contact Number"
            value={formData.contactNumber || ''}
            onChange={(e) => handleChange('contactNumber', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <input
            type="tel"
            placeholder="Alternate Contact Number"
            value={formData.alternateContact || ''}
            onChange={(e) => handleChange('alternateContact', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
        </div>
      </div>

      {/* Property Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Locality"
            value={formData.locality || ''}
            onChange={(e) => handleChange('locality', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <textarea
            placeholder="Address"
            value={formData.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <select
            value={formData.spaceType || ''}
            onChange={(e) => handleChange('spaceType', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          >
            <option value="">Select Space Type</option>
            {SPACE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={formData.preference || ''}
            onChange={(e) => handleChange('preference', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          >
            <option value="">Select Preference</option>
            {PREFERENCES.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
          {(formData.preference === 'Bachelors' || formData.preference === 'Any') && (
            <select
              value={formData.bachelorType || ''}
              onChange={(e) => handleChange('bachelorType', e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            >
              <option value="">Select Bachelor Type</option>
              {BACHELOR_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Specifications */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={formData.furnishingType || ''}
            onChange={(e) => handleChange('furnishingType', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          >
            <option value="">Select Furnishing Type</option>
            {FURNISHING_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={formData.bhk || ''}
            onChange={(e) => handleChange('bhk', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          >
            <option value="">Select BHK</option>
            {BHK_OPTIONS.map(bhk => (
              <option key={bhk} value={bhk}>{bhk} BHK</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Floor"
            value={formData.floor || ''}
            onChange={(e) => handleChange('floor', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <input
            type="text"
            placeholder="Nearest Landmark"
            value={formData.landmark || ''}
            onChange={(e) => handleChange('landmark', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <select
            value={formData.washroomType || ''}
            onChange={(e) => handleChange('washroomType', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          >
            <option value="">Select Washroom Type</option>
            {WASHROOM_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={formData.coolingType || ''}
            onChange={(e) => handleChange('coolingType', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          >
            <option value="">Select Cooling Type</option>
            {COOLING_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Pets Allowed</label>
            <select
              value={formData.petsAllowed || ''}
              onChange={(e) => handleChange('petsAllowed', e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Car Parking</label>
            <select
              value={formData.carParking || ''}
              onChange={(e) => handleChange('carParking', e.target.value)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <input
            type="number"
            placeholder="Rent"
            value={formData.rent || ''}
            onChange={(e) => handleChange('rent', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <input
            type="number"
            placeholder="Maintenance"
            value={formData.maintenance || ''}
            onChange={(e) => handleChange('maintenance', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
          <input
            type="number"
            placeholder="Square Feet Area"
            value={formData.squareFeet || ''}
            onChange={(e) => handleChange('squareFeet', e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
          />
        </div>
      </div>

      {/* Amenities and Appliances */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Amenities & Appliances</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Appliances</label>
            <MultiSelect
              options={APPLIANCES}
              value={formData.appliances || []}
              onChange={(value) => handleChange('appliances', value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Amenities</label>
            <MultiSelect
              options={AMENITIES}
              value={formData.amenities || []}
              onChange={(value) => handleChange('amenities', value)}
            />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Photos</h3>
        <PhotoUpload
          photos={formData.photos || []}
          onChange={(photos) => handleChange('photos', photos)}
          error={errors.photos}
        />
      </div>

      {/* About Property */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">About Property</h3>
        <textarea
          placeholder="Tell us more about your property..."
          value={formData.about || ''}
          onChange={(e) => handleChange('about', e.target.value)}
          className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 h-32"
        />
      </div>
    </form>
  );
};

export default PropertyForm;
