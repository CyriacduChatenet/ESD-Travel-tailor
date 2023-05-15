'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { TravelService } from '@travel-tailor/services';
import { Travel } from '@travel-tailor/types';
import { useUser } from '@travel-tailor/contexts';
import { Paginator } from '@/components/paginator';
import { ROUTES } from '@/../../packages/constants/src';

export const TravelList = () => {
    const [apiError, setApiError] = useState({});
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState<{ page: number, limit: number, total: number, data: any[] }>({
        page: 0,
        limit: 0,
        total: 0,
        data: []
    });
    const { user } = useUser();

    const handleFetch = async () => {
        if(user) {
            const response = await TravelService.findTravelsByTravelerId(`${process.env.NEXT_PUBLIC_API_URL}`, String(user?.traveler?.id), setApiError, page);
        if (response) {
            setResponse(response);
            return response;
        }
        }
    };

    useMemo(() => {
        if(user) {
            handleFetch();
        }
    }, [page, user]);

    return (
        <>
            <ul>
                {response.data && response.data.map((travel: Travel, index: number) => (
                    <Link key={index} href={`${ROUTES.TRAVELER.TRAVELER}${ROUTES.TRAVELER.TRAVEL.FIND}/${travel.id}`}>
                        <li className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:flex-row xl:justify-between lg:pr-20'>
                            <p>{travel.departureCity} - {travel.destinationCity}</p>
                            <p>{`${new Date(travel.departureDate).toLocaleDateString('fr')}`} - {`${new Date(travel.returnDate).toLocaleDateString('fr')}`}</p>
                            <p>Go</p>
                        </li>
                    </Link>
                ))}
            </ul>
            <Paginator pageCurrent={page} setPage={setPage} limit={response.limit} total={response.total} />
        </>
    );
};