import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>; // atau spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}
