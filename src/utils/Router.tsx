import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/common/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/client/Profile";
import AllClients from "../pages/officer/AllClients";
import KYC from "../pages/client/KYC";
import Unauthorized from "../pages/common/Unauthorized";
import NotFound from "../pages/common/NotFound";
import ClientDetails from "../pages/officer/ClientDetails";

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
        element: <ProtectedRoute role="user" />,
        children: [
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
    {
        element: <ProtectedRoute role="user" />,
        children: [
            {
                path: "/kyc",
                element: <KYC />,
            },
        ],
    },
    {
        element: <ProtectedRoute role="officer" />,
        children: [
            {
                path: "clients",
                element: <AllClients />,
            },
        ],
    },
    {
        element: <ProtectedRoute role="officer" />,
        children: [
            {
                path: "client/:id",
                element: <ClientDetails />,
            },
        ],
    },
    {
        element: <ProtectedRoute role="" />,
        children: [
            {
                path: "/unauthorized",
                element: <Unauthorized />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);
