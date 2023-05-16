import Link from 'next/link';
import { FC, Dispatch, SetStateAction } from "react";

import { Toast } from "@/components/toast";
import { Mapbox } from '@/components/map';
import { ActivityToolbar } from '@/components/traveler/travels/activity/toolBar';

interface IProps {
    location: string;
    duration: number;
    mark: number;
    commentsIndex: number;
    date: Date;
    setDisplayCommentModule: Dispatch<SetStateAction<boolean>>;
    programmingAt: Date;
}

export const ActivityModule: FC<IProps> = ({ location, duration, mark, commentsIndex, date, setDisplayCommentModule }) => {
    return (
        <>
            <ActivityToolbar location={location} duration={duration} mark={mark} commentsIndex={commentsIndex} programmingAt={date} setDisplayCommentModule={setDisplayCommentModule} />
            <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <div className="col-span-4 md:col-span-4 xl:col-span-8">
                    <Toast message={`Open: 09:00 - 12:00`} status={'info'} />
                    <p className="mt-4 lg:mt-8">description</p>
                    <div className="py-4 lg:py-8 w-full flex justify-around items-center">
                        <Link href={''}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Return</button>
                        </Link>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-4 xl:col-span-4 hidden md:block">
                    <Mapbox
                        mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                        addresse={`Bordeaux, Gironde, France`}
                    />
                </div>
            </section>
        </>
    );
};