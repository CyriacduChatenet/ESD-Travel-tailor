'use client';

import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { TravelService } from "@travel-tailor/services";
import { Travel } from "@travel-tailor/types";
import { useParams } from "next/navigation";

import { AuthChecker } from "@/components/auth/authChecker";

const TravelerTravelPage: NextPage = () => {
    const [apiError, setApiError] = useState({});
    const [data, setData] = useState<Travel>({
        id: '',
        departureCity: '',
        destinationCity: '',
        departureDate: new Date(),
        returnDate: new Date(),
    });
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
            <main>
                <h1>{data.departureCity} - {data.destinationCity} from {new Date(data.departureDate).toLocaleDateString('fr')} to {new Date(data.returnDate).toLocaleDateString('fr')}</h1>
            </main>
        </AuthChecker>
    );
};

export default TravelerTravelPage;