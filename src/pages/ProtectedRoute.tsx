import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAppSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
