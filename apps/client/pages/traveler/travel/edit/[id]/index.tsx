import React from "react";
import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";

const TravelerEditTravelPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Traveler Edit Travel</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerEditTravelPage;