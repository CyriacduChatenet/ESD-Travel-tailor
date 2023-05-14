'use client';
import React from "react";
import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";
import { TravelList } from "@/components/traveler/travels/travelList";
import { Mapbox } from "@/components/map";

const TravelerDashboardPage: NextPage = () => {
    return (
        <AuthChecker>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                    <h1 className="font-bold lg:text-2xl">Traveler Dashboard</h1>
                    <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                        <div className="col-span-4 md:col-span-4 xl:col-span-8">
                            <TravelList />
                        </div>
                        <div className="col-span-4 md:col-span-4 xl:col-span-4 hidden md:block">
                            <Mapbox
                                mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                                addresse={`Bordeaux, Gironde, France`}
                            />
                        </div>
                    </section>
                </section>
            </main>
        </AuthChecker>
    );
};

export default TravelerDashboardPage;