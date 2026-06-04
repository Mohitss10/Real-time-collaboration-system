import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // IF LOGGED IN
  if (token) {
    return <Navigate to="/projects" />;
  }

  return children;
};

export default PublicRoute;