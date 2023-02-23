import { FC } from "react";
import { Role, Routes, Route } from "@travel-manager/functions";

import { PrivateRoutes } from "@/setup/router/private";

export const AdminRouter: FC = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes role={Role.Admin} />}></Route>
        </Routes>
    );
};