import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, fetchConfig } from '../utils/api';
import '../styles/Auth.css';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    selectRole: '',
    yourFirstSchool: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        fetchConfig('POST', formData)
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('token', data.data.authToken);
      navigate('/');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="auth-box">
        <div className="border"></div>
        <div className="auth-content bg-black p-8 rounded-lg relative z-10">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Register</h2>
          {error && (
            <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full bg-transparent border-b border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full bg-transparent border-b border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full bg-transparent border-b border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-transparent border-b border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full bg-transparent border-b border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <select
                name="selectRole"
                value={formData.selectRole}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                required
              >
                <option value="" disabled className="bg-gray-900">Select Role</option>
                <option value="tenant" className="bg-gray-900">Tenant</option>
                <option value="owner" className="bg-gray-900">Owner</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="yourFirstSchool"
                value={formData.yourFirstSchool}
                onChange={handleChange}
                placeholder="Your First School"
                className="w-full bg-transparent border-b border-gray-600 px-4 py-2 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
            >
              REGISTER
            </button>
            <div className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-teal-500 hover:text-teal-400">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
