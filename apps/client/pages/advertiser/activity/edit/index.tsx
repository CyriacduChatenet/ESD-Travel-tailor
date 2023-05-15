import React from "react";
import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";

const AdvertiserEditActivityPage: NextPage = () => {
    return (
        <AuthChecker>
            <main>
                <h1>Advertiser Edit Activity</h1>
            </main>
        </AuthChecker>
    );
};

export default AdvertiserEditActivityPage;