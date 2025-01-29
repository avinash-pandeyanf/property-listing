import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <header className="bg-black p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-yellow-500 flex items-center">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
              To-Let Globe
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-yellow-500">Home</Link>
              <Link to="/properties" className="text-white hover:text-yellow-500">Properties</Link>
              <Link to="/blog" className="text-white hover:text-yellow-500">Blog</Link>
              <Link to="/contact" className="text-white hover:text-yellow-500">Contact</Link>
              <Link to="/login" className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                Login
              </Link>
            </div>
          </div>
        </header>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/add-property"
              element={
                <ProtectedRoute>
                  <AddProperty />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
