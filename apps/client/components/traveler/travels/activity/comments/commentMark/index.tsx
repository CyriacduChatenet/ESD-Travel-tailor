import { Icon } from "@iconify/react";
import { FC } from "react";

export const CommentMark: FC = () => {
    return (
        <div className="lg:col-span-4 col-span-8 flex flex-col items-center justify-center w-full lg:h-1/2 h-9/12 bg-blue-100 py-8">
            <p className="font-bold flex items-center justify-around">
                <Icon icon="material-symbols:star-rate" />
                &nbsp; 
                <span className="font-normal">9/10</span>
                &nbsp; 
                <span className="font-normal">-</span>
                &nbsp; 
                65 Comments
            </p>
            <ul className="w-full px-12 pt-6">
                <li className="flex justify-between items-center w-full py-4">
                    <p>Criteria</p>
                    <p>slider</p>
                    <p>xx/xx</p>
                </li>
                <li className="flex justify-between items-center w-full py-4">
                    <p>Criteria</p>
                    <p>slider</p>
                    <p>xx/xx</p>
                </li>
                <li className="flex justify-between items-center w-full py-4">
                    <p>Criteria</p>
                    <p>slider</p>
                    <p>xx/xx</p>
                </li>
                <li className="flex justify-between items-center w-full py-4">
                    <p>Criteria</p>
                    <p>slider</p>
                    <p>xx/xx</p>
                </li>
                <li className="flex justify-between items-center w-full py-4">
                    <p>Criteria</p>
                    <p>slider</p>
                    <p>xx/xx</p>
                </li>
            </ul>
        </div>
    );
};