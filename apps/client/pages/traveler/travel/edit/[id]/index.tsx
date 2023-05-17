import React from "react";
import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";

const TravelerEditTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout>
                <main className="pt-20">
                    <h1>Traveler Edit Travel</h1>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default TravelerEditTravelPage;