import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // GET TOKEN
  const token = localStorage.getItem("token");

  // IF NO TOKEN
  if (!token) {
    return <Navigate to="/login" />;
  }

  // IF TOKEN EXISTS
  return children;
};

export default ProtectedRoute;