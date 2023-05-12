import React from "react";
import { NextPage } from "next";
import { AuthChecker } from "@/components/auth/authChecker";

const TravelerDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <h1>Traveler Dashboard</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerDashboardPage;