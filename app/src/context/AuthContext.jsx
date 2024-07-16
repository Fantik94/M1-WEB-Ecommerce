// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      try {
        const decoded = jwt_decode(token);  // Utiliser l'importation corrigée
        setIsAuthenticated(true);
        setUserInfo(decoded);
        setRoles(decoded.roles);
        fetchUserInfo(userId);
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
  }, []);

  const login = (token, userId) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      const decoded = jwt_decode(token);  // Utiliser l'importation corrigée
      setIsAuthenticated(true);
      setUserInfo(decoded);
      setRoles(decoded.roles);
      fetchUserInfo(userId);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserInfo(null);
    setRoles([]);
  };

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, roles, login, logout, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
