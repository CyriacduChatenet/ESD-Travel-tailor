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
                    <div className="col-span-4 md:col-span-8 xl:col-span-12 flex items-center justify-around py-10">
                        <Link href={ROUTES.ADVERTISER.DASHBOARD}>
                            <button
                                type="submit"
                                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Return
                            </button>
                        </Link>
                        <h1 className="font-bold text-2xl col-span-4 lg:col-span-8 xl:col-span-12 xl:row-span-1 text-center">Edit Activity</h1>
                    </div>
                    <EditActivityForm />
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdvertiserEditActivityPage;