export const validatePropertyForm = (values) => {
  const errors = {};
  
  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }
  
  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }
  
  if (!values.contactNumber?.trim()) {
    errors.contactNumber = 'Contact number is required';
  } else if (!/^\d{10}$/.test(values.contactNumber)) {
    errors.contactNumber = 'Invalid contact number';
  }
  
  if (!values.locality?.trim()) {
    errors.locality = 'Locality is required';
  }
  
  if (!values.address?.trim()) {
    errors.address = 'Address is required';
  }
  
  if (!values.spaceType) {
    errors.spaceType = 'Space type is required';
  }
  
  if (!values.subscriptionAmount || values.subscriptionAmount <= 0) {
    errors.subscriptionAmount = 'Valid subscription amount is required';
  }
  
  if (values.photos?.length < 5) {
    errors.photos = 'Minimum 5 photos are required';
  }
  
  return errors;
};
