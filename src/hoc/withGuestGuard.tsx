import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const withGuestGuard = (Component: React.ComponentType<any>) => {
  return (props: any) => {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated && user) {
      const relPath = user.user_type === "user" ? "/user" : "/admin";
      return <Navigate to={relPath} />;
    }

    return <Component {...props} />;
  };
};
