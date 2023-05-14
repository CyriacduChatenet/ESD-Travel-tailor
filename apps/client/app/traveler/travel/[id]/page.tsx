'use client';

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { TravelService } from "@travel-tailor/services";
import { Travel } from "@travel-tailor/types";
import { useParams } from "next/navigation";

import { AuthChecker } from "@/components/auth/authChecker";
import { Mapbox } from "@/components/map";
import { DayNavbar } from "@/components/traveler/travels/dayNavbar";

const TravelerTravelPage: NextPage = () => {
    const [apiError, setApiError] = useState({});
    const [data, setData] = useState<Travel>({
        id: '',
        departureCity: '',
        destinationCity: '',
        departureDate: new Date(),
        returnDate: new Date(),
        days: [],
    });
    const [day, setDay] = useState<Date>(new Date());

    const params = useParams();

    const handleFetch = async () => {
        const response = await TravelService.findTravelById(`${process.env.NEXT_PUBLIC_API_URL}`, params.id, setApiError);
        if(response) {
            setData(response);
            return response;
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);
    return (
        <AuthChecker>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
            <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                    <h1 className="font-bold lg:text-2xl">{data.departureCity} - {data.destinationCity} from {new Date(data.departureDate).toLocaleDateString('fr')} to {new Date(data.returnDate).toLocaleDateString('fr')}</h1>
                    <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                        <div className="col-span-4 md:col-span-4 xl:col-span-8">
                            <DayNavbar days={data.days} dayCurrent={day} setDay={setDay} />
                            activity list
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

export default TravelerTravelPage;