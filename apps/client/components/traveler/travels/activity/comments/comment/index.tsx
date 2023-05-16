import Image from "next/image";
import { FC } from "react";

interface IProps {
    author: string;
    content: string;
    createdAt: Date;
}

export const Comment: FC<IProps> = ({ author, content, createdAt }) => {
    return (
        <li className="shadow appearance-none border rounded w-full py-4 px-6 my-4 text-gray-700 leading-tight">
            <div className="flex justify-between items-center w-full">
                <Image src={''} alt="" width={32} height={32} />
                <p className="w-full flex justify-around items-center">
                    <span className="flex justify-around items-center w-1/3">
                        <span>{author}</span><div className="hidden lg:block"><span>Role</span></div>
                    </span>
                    <span>{new Date(createdAt).toLocaleString('fr')}</span>
                </p>
            </div>
            <p className="w-full pt-4 text-justify">{content}</p>
        </li>
    );
};