import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Link to="/" />;
};

export default PrivateRoute;
