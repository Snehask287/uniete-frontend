import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // For now, check localStorage for a fake "auth" flag
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
