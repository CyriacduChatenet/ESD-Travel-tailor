import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { parse } from 'cookie';
import { TravelService, UserService } from "@travel-tailor/services";
import { jwtDecode } from "@travel-tailor/functions";
import { AccessToken, Travel, User } from "@travel-tailor/types";

import { AuthChecker } from "@/components/auth/authChecker";
import { TravelList } from "@/components/traveler/travels/travelList";
import { CreateTravelForm } from "@/components/traveler/travels/createForm";
import { Layout } from "@/components/layout";

interface IProps {
    data: {
        page: number;
        limit: number;
        total: number;
        data: Travel[];
    },
    user: User;
}

const TravelerDashboardPage: NextPage<IProps> = ({ data, user }) => {
    const [travels, setTravels] = useState<{
        page: number;
        limit: number;
        total: number;
        data: Travel[];
      }>(data);
    return (
        <AuthChecker>
            <Layout title={"Personalized Travel Dashboard | Create Your Perfect Itinerary"} description={"Manage your travel experience like never before with our intuitive travel dashboard. Build your dream trip, customize activities to match your preferences, and explore new destinations based on your unique tastes. Start crafting your personalized journey today!"}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Traveler Dashboard</h1>
                        <CreateTravelForm data={travels} setData={setTravels} />
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-4 xl:col-span-8">
                                <TravelList data={travels} setData={setTravels} user={user} />
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

export default TravelerDashboardPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const error = {};

    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const accessToken = parsedCookies.accessToken;
    const decodedToken = jwtDecode(accessToken) as AccessToken;

    const user = await UserService.getUserByToken(`${process.env.API_URL}`, decodedToken.email, error);
    const response = await TravelService.findTravelsByTravelerId(`${process.env.API_URL}`, String(user?.traveler?.id), error, 1, 10);
    return {
        props: {
            data: response !== undefined ? response : {},
            user: user,
        }
    };
};