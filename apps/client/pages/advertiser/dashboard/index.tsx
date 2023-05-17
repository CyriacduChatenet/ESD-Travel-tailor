import React from "react";
import { NextPage } from "next";
import { ROUTES } from "@travel-tailor/constants";
import Link from "next/link";
import Image from "next/image";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { ActivityListPaginator } from "@/components/traveler/travels/activity/activityListPaginator";

const AdvertiserDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Advertiser Dashboard</h1>
                        <Link href={ROUTES.ADVERTISER.ACTIVITY.CREATE_ACTIVITY}>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                add Activity
                            </button>
                        </Link>
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-4 xl:col-span-8">
                                <ActivityListPaginator />
                            </div>
                            <div className="col-span-4 md:col-span-4 xl:col-span-4 hidden md:block">
                                <Image src="https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="city" width={500} height={500} priority />
                            </div>
                        </section>
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserDashboardPage;