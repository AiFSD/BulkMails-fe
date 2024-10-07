import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/authContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  console.log("PrivateRoute called with location:", location);
  console.log("Token state:", token);

  return token ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
