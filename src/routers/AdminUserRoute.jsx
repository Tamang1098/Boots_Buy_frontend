import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { useContext } from "react";

export default function AdminUserRoute() {
     const { user, loading } = useContext(AuthContext);

    if (loading) return <>loading</>;

    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "admin") return <Navigate to="/" replace />;

    return <Outlet />;
}