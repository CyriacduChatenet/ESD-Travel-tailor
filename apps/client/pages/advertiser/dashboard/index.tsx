import React from "react";
import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";

const AdvertiserDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <h1>Advertiser Dashboard</h1>
            </main>
        </AuthChecker>
    );
};

export default AdvertiserDashboardPage;