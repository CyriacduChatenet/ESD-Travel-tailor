import React from "react";
import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";

const AdvertiserCreateActivityPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout>
                <main>
                    <h1>Advertiser Create Activity</h1>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserCreateActivityPage;