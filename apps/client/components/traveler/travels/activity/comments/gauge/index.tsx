import { FC, useEffect, useState } from "react";

interface IProps {
    percentage: number;
}

export const Gauge: FC<IProps> = ({ percentage }) => {
    const [filledPercentage, setFilledPercentage] = useState(0);

    useEffect(() => {
        setFilledPercentage(percentage);
    }, [percentage]);

    return (
        <div className="relative w-32 h-1.5 bg-indigo-200 rounded-full">
            <div
                className="absolute top-0 left-0 h-full bg-cyan-600 rounded-full"
                style={{ width: `${filledPercentage}%` }}
            />
        </div>
    );
};