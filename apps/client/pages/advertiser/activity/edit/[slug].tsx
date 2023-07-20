import React from "react";
import { NextPage } from "next";
import { ROUTES } from "@travel-tailor/constants";
import Link from "next/link";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { EditActivityForm } from "@/components/advertiser/activity/editForm";

const AdvertiserEditActivityPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout title={""} description={""}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <EditActivityForm />
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserEditActivityPage;