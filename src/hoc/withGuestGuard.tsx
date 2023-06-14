import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const withGuestGuard = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated && user) {
      return <Navigate to={`/${user.user_type}`} />;
    }

    return <Component {...props} />;
  };
};
