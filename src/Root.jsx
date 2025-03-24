import React, { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/Theme/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./screens/login/authSlice";
import { Aside } from "./components";

const Root = () => {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <div className="fixed inset-0 w-full h-full flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && location.pathname === "/") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex h-[100svh] overflow-hidden">
      <div className="w-60 max-w-60 flex flex-col h-full overflow-hidden">
        <Aside />
      </div>
      <div className=" flex flex-col h-full overflow-auto flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
