import { Icon } from "@iconify/react";
import Image from "next/image";
import { FC } from "react";

interface IProps {
    author: string;
    role: string;
    content: string;
    createdAt: Date;
}

export const Comment: FC<IProps> = ({ author, role, content, createdAt }) => {
    return (
        <li className="shadow appearance-none border rounded w-full py-4 px-6 my-4 text-gray-700 leading-tight">
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-400 text-white">
                    <Icon icon="material-symbols:person" className="w-6 h-6" />
                </div>
                <p className="w-full flex justify-around items-center">
                    <span className="flex justify-around items-center w-1/3">
                        <span className="font-bold">{author}</span><div className="hidden lg:block font-normal italic"><span>{role}</span></div>
                    </span>
                    <span>{new Date(createdAt).toLocaleString('fr')}</span>
                </p>
            </div>
            <p className="w-full pt-4 text-justify">{content}</p>
        </li>
    );
};