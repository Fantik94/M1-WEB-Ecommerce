// src/components/vues/AdminRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, userInfo } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!userInfo || !userInfo.roles.includes('user')) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
