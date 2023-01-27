import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children} : PropsWithChildren) => {
    const auth = {token : false}

    if(!auth) return <Navigate to="/signin" />;

    return children;
}