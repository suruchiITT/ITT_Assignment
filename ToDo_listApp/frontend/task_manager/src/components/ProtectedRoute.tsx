import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import type { JSX } from "react/jsx-dev-runtime";

export default function ProtectedRoute({ children,}: { children: JSX.Element;}) {
    const { user } = useAppSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
