import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import { Alert, AlertTitle, Container } from "@mui/material";

// locals
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import Login from "../pages/Login";

export const withAuthGuard = (
  Component: React.ComponentType<any>,
  accessibleRoles: string[]
) => {
  return (props: any) => {
    const { isAuthenticated, isInitialized, user } = useAuth();

    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState<string | null>(
      null
    );

    if (!isInitialized) {
      return <LoadingScreen />;
    }

    if (!isAuthenticated) {
      if (pathname !== requestedLocation) {
        setRequestedLocation(pathname);
      }
      return <Login />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
      setRequestedLocation(null);
      return <Navigate to={requestedLocation} />;
    }

    if (user && !accessibleRoles.includes(user.user_type)) {
      return <Navigate to={`/${user.user_type}`} />;
    }

    return <Component {...props} />;
  };
};
