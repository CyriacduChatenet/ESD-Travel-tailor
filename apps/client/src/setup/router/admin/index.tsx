import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Role } from "@travel-manager/functions";

import { PrivateRoutes } from "@/setup/router/private";

export const AdminRouter: FC = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes role={Role.Admin} />}></Route>
        </Routes>
    );
};