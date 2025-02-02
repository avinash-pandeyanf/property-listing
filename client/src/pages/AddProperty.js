import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyForm from '../components/property/PropertyForm';
import { validatePropertyForm } from '../utils/validation';
import { propertyService } from '../services/property.service';

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validatePropertyForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const form = new FormData();
        
        // Handle photos separately
        if (formData.photos) {
          formData.photos.forEach(photo => {
            if (photo instanceof File) {
              form.append('photos', photo);
            }
          });
        }

        // Handle arrays separately
        const arrayFields = ['appliances', 'amenities', 'bachelors'];
        arrayFields.forEach(field => {
          if (formData[field] && Array.isArray(formData[field])) {
            form.append(field, JSON.stringify(formData[field]));
          }
        });

        // Handle all other fields
        Object.keys(formData).forEach(key => {
          if (!['photos', ...arrayFields].includes(key)) {
            form.append(key, formData[key]);
          }
        });

        await propertyService.createProperty(form);
        navigate('/');
      } catch (error) {
        console.error('Error saving property:', error);
        setErrors(prev => ({ ...prev, submit: error.message }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Property</h1>
      
      <PropertyForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
      />
      
      {errors.submit && (
        <div className="mt-4 text-red-500">
          {errors.submit}
        </div>
      )}
      
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Property'}
        </button>
      </div>
    </div>
  );
};

export default AddProperty;