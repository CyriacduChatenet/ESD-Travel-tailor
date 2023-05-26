import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { ROUTES } from "@travel-tailor/constants";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { CreateActivityForm } from "@/components/advertiser/activity/createForm";

const AdvertiserCreateActivityPage: NextPage = () => {
    return (
        <AuthChecker>
            <Layout title={"Create Customized Activities for Your Dream Vacation | Travel Tailor"} description={"Design your perfect travel itinerary with personalized activities tailored to your preferences. Discover our travel manager's activity creation page and curate a memorable journey based on your unique interests and tastes"}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <div className="col-span-4 md:col-span-8 xl:col-span-12 flex items-center justify-around">
                        <Link href={ROUTES.ADVERTISER.DASHBOARD}>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Return
                            </button>
                        </Link>
                        <h1>Advertiser Create Activity</h1>
                    </div>
                    <CreateActivityForm />
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserCreateActivityPage;