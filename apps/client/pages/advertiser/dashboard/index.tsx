import React, { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { ActivityListPaginator } from "@/components/traveler/travels/activity/activityListPaginator";
import { AdvertiserToolBar } from "@/components/advertiser/toolBar";

const AdvertiserDashboardPage: NextPage = () => {
    const [editorMode, setEditorMode] = useState(false);
    return (
        <AuthChecker>
            <Layout>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Advertiser Dashboard</h1>
                        <AdvertiserToolBar setEditorMode={setEditorMode} editorMode={editorMode} />
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-4 xl:col-span-8">
                                <ActivityListPaginator editorMode={editorMode} />
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