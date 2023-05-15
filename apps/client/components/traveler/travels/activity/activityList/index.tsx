import { Day } from '@travel-tailor/types';
import Link from 'next/link';
import React, { FC } from 'react';

interface IProps {
    days: Day[];
    dayCurrent: Date;
}

export const ActivityList: FC<IProps> = ({ days, dayCurrent }) => {
    return (
        <>
            <ul>
            <Link href={''}>
                    <li className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:flex-row xl:justify-between lg:pr-20'>
                        <p></p>
                        <p></p>
                        <p>Go</p>
                    </li>
                </Link>
            </ul>
        </>
    );
};