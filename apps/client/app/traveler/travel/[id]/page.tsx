import React from "react";
import { NextPage } from "next";
import { AuthChecker } from "@/components/auth/authChecker";

const TravelerTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Travel</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerTravelPage;