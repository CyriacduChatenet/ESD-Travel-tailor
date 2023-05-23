import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { TravelService } from "@travel-tailor/services";
import { Travel } from "@travel-tailor/types";
import dynamic from "next/dynamic";

import { AuthChecker } from "@/components/auth/authChecker";
const Mapbox: any = dynamic(() => import('@/components/map').then((mode) => mode.Mapbox), { loading: () => <div className="h-96 w-full" />, ssr: false })
import { DayNavbar } from "@/components/traveler/travels/dayNavbar";
import { ActivityList } from "@/components/traveler/travels/activity/activityList";
import { Layout } from "@/components/layout";

interface IProps {
    data: Travel;
}

const TravelerTravelPage: NextPage<IProps> = ({ data }) => {
    const [day, setDay] = useState<Date>(new Date());
    return (
        <AuthChecker>
            <Layout title={"Create Your Dream Journey with Personalized Activities | Travel Tailor"} description={"Plan your perfect trip with our personalized travel planner. Explore a wide range of activities and create a customized itinerary tailored to your preferences. Discover new destinations, indulge in exciting adventures, and make lasting memories on your unique journey. Start planning today!"}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">{data.destinationCity} from {new Date(data.departureDate).toLocaleDateString('fr')} to {new Date(data.returnDate).toLocaleDateString('fr')}</h1>
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-4 xl:col-span-8">
                                <DayNavbar days={data.days} dayCurrent={day} setDay={setDay} />
                                <ActivityList days={data.days} dayCurrent={day} />
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
            </Layout>
        </AuthChecker>
    );
};

export default TravelerTravelPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const error = {};

    const response = await TravelService.findTravelById(`${process.env.API_URL}`, String(context?.params?.id), error);
    return {
        props: {
            data: response,
        }
    };
};