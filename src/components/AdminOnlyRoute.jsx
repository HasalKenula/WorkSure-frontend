import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminOnlyRoute() {
  const { isAuthenticated, loading, isAdmin } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  if (!isAdmin) return <Navigate to="/unauthorized" />;

  return <Outlet />;
}

export default AdminOnlyRoute;
