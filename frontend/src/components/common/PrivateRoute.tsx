import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute: React.FC = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('sheetimitra_token') : null;
  const location = useLocation();

  if (!token) {
    // Redirect to login page and preserve the attempt location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
