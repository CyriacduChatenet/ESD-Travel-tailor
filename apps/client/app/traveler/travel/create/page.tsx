import React from "react";
import { NextPage } from "next";
import { AuthChecker } from "@/app/components/auth/authChecker";

const TravelerCreateTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Create Travel</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerCreateTravelPage;