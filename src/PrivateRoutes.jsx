import { Outlet, Navigate, useLoaderData } from 'react-router-dom';
import React from 'react';
import NavBar from './NavBar';

const PrivateRoutes = () => {
  const loader = useLoaderData();
  const auth = { isAuthenticated: loader };

  return (
    <div>
      {auth.isAuthenticated ? (
        <div>
          <NavBar />
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" /> // Redirect to login if not authenticated
      )}
    </div>
  );
};

export default PrivateRoutes;