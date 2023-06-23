import { Icon } from "@iconify/react";
import { FC, Dispatch, SetStateAction } from "react";

interface IProps {
    location: string;
    duration: number;
    mark: number;
    commentsIndex: number;
    programmingAt: Date;
    setDisplayCommentModule: Dispatch<SetStateAction<boolean>>;
}

export const ActivityToolbar: FC<IProps> = ({ location, duration, mark, commentsIndex, programmingAt, setDisplayCommentModule }) => {
    return (
        <div className="py-4 lg:py-8 w-full flex flex-col xl:grid xl:grid-cols-12">
            <div className="lg:col-span-4 flex lg:items-center">
                <Icon icon="material-symbols:location-on" className='w-6 h-6 mr-4' />
                <p className="">{location}</p>
            </div>
            <div className="flex justify-between items-center w-full my-4 lg:col-span-4">
                <div className="flex">
                    <Icon icon="mdi:clock" className='w-6 h-6 mr-4' />
                    <p>{duration}h</p>
                </div>
                <div className="flex">
                <Icon icon="material-symbols:note-alt" className='w-6 h-6 mr-4' />
                    <p>{mark ? mark : 0}&nbsp;/&nbsp;10</p>
                </div>
                <div className="flex">
                    <Icon icon="material-symbols:mode-comment-rounded" className='w-6 h-6 mr-4' />
                    <p className="text-blue-500 hover:text-blue-700" onClick={() => setDisplayCommentModule(true)}>Comments( {commentsIndex} )</p>
                </div>
            </div>
            {/* <div className="flex lg:col-span-4 lg:flex lg:justify-center lg:items-center">
                <Icon icon="material-symbols:calendar-today-rounded" className="mr-4 w-6 h-6" />
                <p className="">{new Date(programmingAt).toLocaleDateString('fr')}</p>
            </div> */}
        </div>
    );
};