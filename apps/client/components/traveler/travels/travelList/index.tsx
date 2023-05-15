import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { TravelService } from '@travel-tailor/services';
import { Travel } from '@travel-tailor/types';
import { useUser } from '@travel-tailor/contexts';
import { ROUTES } from '@travel-tailor/constants';
import { Icon } from '@iconify/react';

import { Paginator } from '@/components/paginator';
import { Player } from '@lottiefiles/react-lottie-player';

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
                {response.data ? response.data.map((travel: Travel, index: number) => (
                    <Link key={index} href={`${ROUTES.TRAVELER.TRAVELER}${ROUTES.TRAVELER.TRAVEL.FIND}/${travel.id}`}>
                        <li className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:flex-row xl:justify-between lg:pr-20'>
                            <p>{travel.departureCity} - {travel.destinationCity}</p>
                            <p>{`${new Date(travel.departureDate).toLocaleDateString('fr')}`} - {`${new Date(travel.returnDate).toLocaleDateString('fr')}`}</p>
                            <Icon icon="material-symbols:chevron-right" className='w-6 h-6' />
                        </li>
                    </Link>
                )) : <Player
                src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                className="w-12 h-12"
                loop
                autoplay
            />}
            </ul>
            <Paginator pageCurrent={page} setPage={setPage} limit={response.limit} total={response.total} />
        </>
    );
};