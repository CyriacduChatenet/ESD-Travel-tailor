import React from "react";
import { NextPage } from "next";
import { AuthChecker } from "@/components/auth/authChecker";

const TravelerDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Dashboard</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerDashboardPage;