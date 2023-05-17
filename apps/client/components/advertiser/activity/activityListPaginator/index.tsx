import Link from 'next/link';
import React, { FC, useMemo, useState } from 'react';
import { ActivityService } from '@travel-tailor/services';
import { Activity } from '@travel-tailor/types';
import { useUser } from '@travel-tailor/contexts';
import { ROUTES } from '@travel-tailor/constants';
import { Icon } from '@iconify/react';

import { Paginator } from '@/components/paginator';
import { Player } from '@lottiefiles/react-lottie-player';

interface IProps {
    editorMode: boolean;
}

export const ActivityListPaginator: FC<IProps> = ({ editorMode }) => {
    const [apiError, setApiError] = useState({});
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState<{ page: number, limit: number, total: number, data: Activity[] }>({
        page: 0,
        limit: 0,
        total: 0,
        data: []
    });
    const { user } = useUser();

    const handleFetch = async () => {
        if (user) {
            const response = await ActivityService.findActivitiesByAdvertiserId(`${process.env.NEXT_PUBLIC_API_URL}`, String(user?.advertiser?.id), setApiError, page);
            if (response) {
                setResponse(response);
                return response;
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (user) {
            const res = await ActivityService.deleteActivity(`${process.env.NEXT_PUBLIC_API_URL}`, id, setApiError);
            if (res) {
                setResponse({ ...response, data: response.data.filter((activity: Activity) => activity.id !== id) });
            }
        }
    };

    useMemo(() => {
        if (user) {
            handleFetch();
        }
    }, [page, user]);

    return (
        <>
            <ul>
                {response.data ? response.data.map((activity: Activity, index: number) => (
                    <Link key={index} href={`${ROUTES.ACTIVITY.INDEX}/${activity.slug}`}>
                        <li className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:grid xl:grid-cols-12 xl:gap-5 lg:pr-20'>
                            <p className='lg:col-span-5'>{activity.name}</p>
                            <p className='lg:col-span-5' >{activity.detail.location}</p>
                            <div className='lg:col-span-2'>
                                {editorMode ? <div className={'flex'}>
                                    <Link href={`${ROUTES.ADVERTISER.ACTIVITY.UPDATE_ACTIVITY}/${activity.slug}`}>
                                        <button>
                                            <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                        </button>
                                    </Link>
                                    <button onClick={() => handleDelete(activity.id)}>
                                        <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                    </button>
                                </div> : <Icon icon="material-symbols:chevron-right" className='w-6 h-6' />}
                            </div>
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