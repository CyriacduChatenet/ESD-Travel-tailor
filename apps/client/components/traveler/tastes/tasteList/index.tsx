import React, { FC, useState } from 'react';
import { Taste, User } from '@travel-tailor/types';
import { Player } from '@lottiefiles/react-lottie-player';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { ROUTES } from '@travel-tailor/constants';
import { TasteService } from '@/../../packages/services/src';

interface IProps {
    editorMode: boolean;
    data: Taste[];
}

export const TasteList: FC<IProps> = ({ editorMode, data }) => {
    const [apiError, setApiError] = useState({});
    const [response, setResponse] = useState<Taste[]>([]);

    const handleDelete = async (id: string) => {
        const res = await TasteService.deleteTaste(`${process.env.NEXT_PUBLIC_API_URL}`, id, setApiError);
        if (res) {
            setResponse((prev: Taste[]) => (prev?.filter((taste: Taste) => taste.id !== id)));
        }
    };


    return (
        <>
            <ul>
                {data ? data.map((taste: Taste, index: number) => (
                    <li key={index} className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:grid xl:grid-cols-12 xl:gap-5 lg:pr-20'>
                        <p className='lg:col-span-6'>{taste.name}</p>
                        <div className='lg:col-span-2'>
                            {editorMode && <div className={'flex'}>
                                <Link href={`${ROUTES.TRAVELER.TASTE.EDIT}/${taste.id}`}>
                                    <button>
                                        <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                    </button>
                                </Link>
                                <button onClick={() => handleDelete(String(taste.id))}>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>}
                        </div>
                    </li>
                )) : <Player
                    src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                    className="w-12 h-12"
                    loop
                    autoplay
                />}
            </ul>
        </>
    );
};