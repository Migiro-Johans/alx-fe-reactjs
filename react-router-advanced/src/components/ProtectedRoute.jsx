import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Remember where the user wanted to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
