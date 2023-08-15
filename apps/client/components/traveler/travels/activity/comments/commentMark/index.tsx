import { ActivityMark } from "@travel-tailor/types";
import { Icon } from "@iconify/react";
import { FC } from "react";

import { Gauge } from "../gauge";

interface IProps {
    commentsLength: number;
    marks: ActivityMark;
}

export const CommentMark: FC<IProps> = ({ commentsLength, marks }) => {
    return (
        <div className="lg:col-span-4 col-span-8 flex flex-col items-center justify-center w-full lg:h-full h-9/12 bg-sky-50 py-8">
            <p className="font-bold flex items-center justify-around">
                <Icon icon="material-symbols:star-rate" aria-label="star icon" />
                &nbsp;
                <span className="font-normal">{marks && marks.global}&nbsp;/&nbsp;5</span>
                &nbsp;
                <span className="font-normal">-</span>
                &nbsp;
                {commentsLength} Comments
            </p>
            <ul className="w-full px-6 xl:px-12 pt-6">
                <li className="grid grid-cols-12 gap-5 w-full py-4">
                    <p className="col-span-4">Rentability</p>
                    <div className="col-span-6 flex items-center">
                        <Gauge percentage={marks ? marks.rentability * 20 : 0} />
                    </div>
                    <p className="col-span-2">{marks ? marks.rentability : 0 }&nbsp;/&nbsp;5</p>
                </li>
                <li className="grid grid-cols-12 gap-5 w-full py-4">
                    <p className="col-span-4">Place</p>
                    <div className="col-span-6 flex items-center">
                        <Gauge percentage={marks ? marks.place * 20 : 0} />
                    </div>
                    <p className="col-span-2">{marks ? marks.place : 0}&nbsp;/&nbsp;5</p>
                </li>
                <li className="grid grid-cols-12 gap-5 w-full py-4">
                    <p className="col-span-4">Waiting</p>
                    <div className="col-span-6 flex items-center">
                        <Gauge percentage={marks ? marks.waiting * 20 : 0} />
                    </div>
                    <p className="col-span-2">{marks ? marks.waiting : 0}&nbsp;/&nbsp;5</p>
                </li>
                <li className="grid grid-cols-12 gap-5 w-full py-4">
                    <p className="col-span-4">Explanation</p>
                    <div className="col-span-6 flex items-center">
                        <Gauge percentage={marks ? marks.explanation * 20 : 0} />
                    </div>
                    <p className="col-span-2">{marks ? marks.explanation : 0}&nbsp;/&nbsp;5</p>
                </li>
                <li className="grid grid-cols-12 gap-5 w-full py-4">
                    <p className="col-span-4">Arrival</p>
                    <div className="col-span-6 flex items-center">
                        <Gauge percentage={marks ? marks.arrival * 20 : 0} />
                    </div>
                    <p className="col-span-2">{marks ? marks.arrival : 0}&nbsp;/&nbsp;5</p>
                </li>
            </ul>
        </div>
    );
};