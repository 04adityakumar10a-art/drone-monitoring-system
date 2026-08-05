import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { isAuthenticated } = useAuth();

    const role = localStorage.getItem("role");

    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (
        location.pathname === "/users" &&
        role !== "ADMIN"
    ) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default ProtectedRoute;