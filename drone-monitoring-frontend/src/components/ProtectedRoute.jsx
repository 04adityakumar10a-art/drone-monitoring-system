import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const location = useLocation();

    // Not logged in
    if (!token) {

        return <Navigate to="/" replace />;

    }

    // Only ADMIN can access /users
    if (
        location.pathname === "/users" &&
        role !== "ADMIN"
    ) {

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default ProtectedRoute;