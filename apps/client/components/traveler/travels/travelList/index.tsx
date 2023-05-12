'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TravelerService } from '@travel-tailor/services';
import { Travel } from '@travel-tailor/types';
import { useUser } from '@travel-tailor/contexts';

export const TravelList = () => {
    const [apiError, setApiError] = useState({});
    const [travels, setTravels] = useState<Travel[]>([]);
    const { user } = useUser();

    const handleFetch = async () => {
        const response = await TravelerService.findTravelerById(`${process.env.NEXT_PUBLIC_API_URL}`, String(user?.traveler?.id), setApiError);
        if (response) {
            console.log(response.travels);
            setTravels(response.travels);
            return response;
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <ul>
            {travels && travels.map((travel: Travel, index: number) => (
                <Link key={index} href={''}>
                    <li className='px-4 py-2 rounded-lg blue'>
                        <p>{travel.departureCity} - {travel.destinationCity}</p>
                        <p>{`${new Date(travel.departureDate)}`} - {`${new Date(travel.returnDate)}`}</p>
                    </li>
                </Link>
            ))}
        </ul>
    );
};