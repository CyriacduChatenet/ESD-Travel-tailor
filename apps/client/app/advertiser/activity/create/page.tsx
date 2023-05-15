import React from "react";
import { NextPage } from "next";
import { AuthChecker } from "@/app/components/auth/authChecker";

const AdvertiserCreateActivityPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Advertiser Create Activity</h1>
            </main>
        </AuthChecker>
    );
};

export default AdvertiserCreateActivityPage;