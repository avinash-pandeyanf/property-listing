import React, { createContext, useState, useContext, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'https://property-listing-0m2j.onrender.com/api';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token with backend
        fetch(`${API_URL}/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
        })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(err => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    } else {
      throw new Error(data.message);
    }
  };

  const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(userData),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      return { success: true };
    } else {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
