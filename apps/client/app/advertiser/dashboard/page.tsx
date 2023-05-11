import React from "react";
import { NextPage } from "next";
import { AuthChecker } from "@/components/auth/authChecker";

const AdvertiserDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Advertiser Dashboard</h1>
            </main>
        </AuthChecker>
    );
};

export default AdvertiserDashboardPage;