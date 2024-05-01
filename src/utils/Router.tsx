import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import Clients from "../pages/Clients";
import DefaultLayout from "../components/Layout";

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
        element: <ProtectedRoute role="officer" />,
        children: [
            {
                path: "clients",
                element: <Clients />,
            },
        ],
    },
    {
        element: <ProtectedRoute role="" />,
        children: [
            {
                path: "/unauthorized",
                element: (
                    <DefaultLayout>
                        <h2>You are unauthorized</h2>
                    </DefaultLayout>
                ),
            },
        ],
    },
    {
        path: "*",
        element: (
            <DefaultLayout>
                <h2>404 Error - Nothing here...</h2>
            </DefaultLayout>
        ),
    },
]);
