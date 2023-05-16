import React from "react";
import { NextPage } from "next";
import { ROUTES } from "@travel-tailor/constants";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import Link from "next/link";

const AdvertiserDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                    <h1>Advertiser Dashboard</h1>
                    <Link href={ROUTES.ADVERTISER.ACTIVITY.CREATE_ACTIVITY}>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            add Activity
                        </button>
                    </Link>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserDashboardPage;