'use client';

import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { TravelService } from '@travel-tailor/services';
import { Travel } from '@travel-tailor/types';
import { useUser } from '@travel-tailor/contexts';
import { Paginator } from '@/components/paginator';

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
        const response = await TravelService.findTravelsByTravelerId(`${process.env.NEXT_PUBLIC_API_URL}`, String(user?.traveler?.id), setApiError, page);
        if (response) {
            setResponse(response);
            return response;
        }
    };

    useMemo(() => {
        handleFetch();
    }, [page]);

    return (
        <>
            <p>Page {page}</p>
            <ul>
                {response.data && response.data.map((travel: Travel, index: number) => (
                    <Link key={index} href={''}>
                        <li className='px-4 py-2 rounded-lg blue'>
                            <p>{travel.departureCity} - {travel.destinationCity}</p>
                            <p>{`${new Date(travel.departureDate)}`} - {`${new Date(travel.returnDate)}`}</p>
                        </li>
                    </Link>
                ))}
            </ul>
            <Paginator pageCurrent={page} setPage={setPage} limit={response.limit} total={response.total} />
        </>
    );
};