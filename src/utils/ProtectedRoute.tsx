import { Navigate, Outlet } from "react-router-dom";
import { IUser } from "./Auth";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedRoute = ({ role }: { role: string }) => {
    const [user] = useLocalStorage<IUser>("user");

    if (!user || (role && !user.Roles?.includes(role))) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
