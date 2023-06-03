import { ROUTES } from '@travel-tailor/constants';
import { Icon } from '@iconify/react';
import { Day, TimeSlot } from '@travel-tailor/types';
import Link from 'next/link';
import React, { FC, useMemo, useState } from 'react';

interface IProps {
    days: Day[];
    dayCurrent: Date;
}

export const ActivityList: FC<IProps> = ({ days, dayCurrent }) => {
    const [day, setDay] = useState<Day[]>([]);

    useMemo(() => {
        setDay(days.filter(day => day.date === dayCurrent))
    }, [dayCurrent, days])
    return (
        <>
            <ul>
                {days && day[0]?.timeSlots?.map((timeSlot: TimeSlot) => <Link href={`${ROUTES.ACTIVITY.INDEX}/${timeSlot.activity.slug}`} key={timeSlot.id}>
                    <li className='px-4 py-4 my-4 xl:mr-8 rounded-lg flex flex-col xl:grid lg:grid-cols-12 bg-gray-100 blue lg:pr-20'>
                        <div className='flex justify-between items-center lg:col-span-2'>
                            <Icon icon="mdi:clock" className='w-6 h-6' />
                            <p>{new Date(timeSlot?.startTime).getHours()}h - {new Date(timeSlot?.endTime).getHours()}h</p>
                        </div>
                        <div className='flex justify-between lg:col-span-10'>
                            <div className='flex justify-between lg:justify-around w-full lg:mx-12'>
                                <p className='w-10/12 md:w-full'>{timeSlot.activity.name}</p>
                                    <p className='hidden md:block lg:mr-8'>{timeSlot.activity.detail.duration}h</p>
                                    <p className='w-2/12 md:w-full'>{timeSlot.activity.marks ? timeSlot.activity.marks.global : 0}/5</p>
                            </div>
                            <div className='lg:col-span-2'>
                                <Icon icon="material-symbols:chevron-right" className='w-6 h-6' />
                            </div>
                        </div>
                    </li>
                </Link>)}
                {!day[0]?.timeSlots?.length && <p>No activity for this day</p>}
            </ul>
        </>
    );
};