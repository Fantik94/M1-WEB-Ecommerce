// src/components/vues/AdminRoute.jsx
import React, { useContext } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, userInfo } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Link to="/login" />;
  }

  if (!userInfo || !userInfo.roles.includes('admin')) {
    return <Link to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
