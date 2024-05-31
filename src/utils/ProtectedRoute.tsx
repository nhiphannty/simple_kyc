import { Navigate, Outlet } from "react-router-dom";
import { IUser } from "./Auth";
import useLocalStorage from "../hooks/useLocalStorage";
import LocalStorageKey from "../common/constants/LocalStorageKeys";

const ProtectedRoute = ({ role }: { role: string }) => {
    const [user] = useLocalStorage<IUser>(LocalStorageKey.User);

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    } else {
        if (role && !user.Roles?.includes(role)) {
            return (
                <Navigate
                    to="/unauthorized"
                    replace
                />
            );
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
