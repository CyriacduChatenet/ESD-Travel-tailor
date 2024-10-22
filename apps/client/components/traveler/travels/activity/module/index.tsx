import Link from 'next/link';
import { FC, Dispatch, SetStateAction } from "react";
import { useHistory } from '@travel-tailor/contexts';
import dynamic from "next/dynamic";

import { Toast } from "@/components/toast";
const Mapbox: any = dynamic(() => import('@/components/map').then((mode) => mode.Mapbox), { loading: () => <div className="h-96 w-full" />, ssr: true })
import { ActivityToolbar } from '@/components/traveler/travels/activity/toolBar';

interface IProps {
    location: string;
    duration: number;
    mark: number;
    commentsIndex: number;
    date: Date;
    setDisplayCommentModule: Dispatch<SetStateAction<boolean>>;
    programmingAt: Date;
    description: string;
    open: string;
    close: string;
}

export const ActivityModule: FC<IProps> = ({ location, duration, open, close, mark, commentsIndex, date, setDisplayCommentModule, description }) => {
    const { pathname } = useHistory();
    return (
        <>
            <ActivityToolbar location={location} duration={duration} mark={mark} commentsIndex={commentsIndex} programmingAt={date} setDisplayCommentModule={setDisplayCommentModule} />
            <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <div className="col-span-4 md:col-span-4 xl:col-span-8">
                    <Toast message={`Open: ${open} - ${close}`} status={'info'} />
                    <p className="mt-4 lg:mt-8">{description}</p>
                    <div className="py-4 lg:py-8 w-full flex justify-around items-center">
                        <Link href={pathname}>
                            <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Return</button>
                        </Link>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-4 xl:col-span-4 hidden md:block">
                    <Mapbox
                        mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                        addresse={location}
                    />
                </div>
            </section>
        </>
    );
};