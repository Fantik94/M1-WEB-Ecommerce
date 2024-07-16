// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ roles, element, ...rest }) => {
  const { isAuthenticated, userInfo } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && roles.length > 0 && !roles.some(role => userInfo.roles.includes(role))) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
