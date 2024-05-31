import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import Clients from "../pages/Clients";
import DefaultLayout from "../components/Layout";
import KYC from "../pages/KYC";
import { Result } from "antd";

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
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        ),
    },
]);
