import React from "react";
import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";

const TravelerEditTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout title={"Customize Your Dream Journey: Create a Personalized Travel Experience"} description={"With our travel management platform, design your perfect trip by tailoring activities to suit your preferences. Create a unique itinerary that reflects your tastes and interests. Start planning today!"}>
                <main className="pt-20">
                    <h1>Traveler Edit Travel</h1>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default TravelerEditTravelPage;