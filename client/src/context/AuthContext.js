import React, { createContext, useState, useContext, useEffect } from 'react';
import { API_URL, fetchConfig } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set initial user state from stored data
      const storedUser = localStorage.getItem('userData');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch(
      `${API_URL}/api/auth/login`,
      fetchConfig('POST', { email, password })
    );
    
    const data = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', data.data.authToken);
      localStorage.setItem('userData', JSON.stringify(data.data));
      setUser(data.data);
      return { success: true };
    } else {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


