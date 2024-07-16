import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      setIsAuthenticated(true);
      fetchUserInfo(userId, token);
    }
  }, []);

  const login = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    fetchUserInfo(userId, token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  const fetchUserInfo = async (userId, token) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const roles = parseJwt(token).roles;
      setUserInfo({ ...response.data, roles });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userInfo, login, logout, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
