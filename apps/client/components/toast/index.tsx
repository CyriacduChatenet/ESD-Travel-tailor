import { Icon } from "@iconify/react";
import { FC } from "react";

interface IProps {
    message: string;
    status: 'success' | 'error' | 'info' | 'warn';
}

export const Toast: FC<IProps> = ({ message, status }) => {
    return (
        <div className={`rounded-md py-2 px-4 w-full md:w-96 flex items-center ${status === 'info' ? 'bg-blue-100 text-blue-800' : status === 'error' ? 'bg-red-200 text-red-800' : 'success' ? 'bg-green-200 text-green-800': 'warn' ? 'bg-orange-200 text-orange-800' : ''}`}>
            <Icon icon={`${status === 'info' ? 'material-symbols:info' : status === 'error' ? 'ic:outline-error' : 'success' ? 'clarity:success-standard-solid': 'warn' ? 'ep:warn-triangle-filled' : ''}`} className={`w-6 h-6 ${status === 'info' ? 'bg-blue-200 text-blue-800' : status === 'error' ? 'bg-red-200 text-red-800' : 'success' ? 'bg-green-200 text-green-800': 'warn' ? 'bg-orange-200 text-orange-800' : ''}`} />
            <span className="ml-4">{message}</span>
        </div>
    );
};