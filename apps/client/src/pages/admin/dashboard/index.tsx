import { NextPage } from "next";
import { AuthService } from "@travel-tailor/services";
import { useAdminProtectedRoute, useProtectedRoute } from "@travel-tailor/hooks";
import { authUtil } from "@travel-tailor/utils";

import { Layout } from "@/layout";

const AdminDashboard: NextPage = () => {
    useProtectedRoute(authUtil);
    useAdminProtectedRoute(authUtil);
    return (
        <Layout>
            <h1>Admin Dashboard</h1>
            <br />
            <button onClick={() => AuthService.logout()}>logout</button>
        </Layout>
    );
};

export default AdminDashboard;