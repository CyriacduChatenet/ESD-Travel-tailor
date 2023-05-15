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
                {days && day[0]?.timeSlots.map((timeSlot: TimeSlot) => <Link href={''} key={timeSlot.id}>
                    <li className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:flex-row xl:justify-between lg:pr-20'>
                        <p>{new Date(timeSlot?.startTime).getHours()}h - {new Date(timeSlot?.endTime).getHours()}h</p>
                        <p>{timeSlot.activity.name}</p>
                        <p>duration: {timeSlot.activity.detail.duration}h</p>
                        <p>{timeSlot.activity.mark}/10</p>
                        <p>Go</p>
                    </li>
                </Link>)}
                {!day[0]?.timeSlots.length && <p>No activity for this day</p>}
            </ul>
        </>
    );
};