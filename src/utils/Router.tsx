import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import Clients from "../pages/Clients";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <ProtectedRoute role="" />,
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
    {
        element: <ProtectedRoute role="officer" />,
        children: [
            {
                path: "clients",
                element: <Clients />,
            },
        ],
    },
    {
        path: "*",
        element: <p>404 Error - Nothing here...</p>,
    },
]);
