import { Dispatch, FC, SetStateAction, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { Activity, Comment } from "@travel-tailor/types";
import { useUser } from "@travel-tailor/contexts";
import { CommentService, TravelerService } from "@/../../packages/services/src";

interface IProps {
    data: Activity;
    setData: Dispatch<SetStateAction<Activity>>;
    comments: Comment[];
}

interface ICommentForm {
    content: string;
}

export const CommentForm: FC<IProps> = ({ data, setData, comments }) => {
    const [apiErrors, setApiErrors] = useState<any>();

    const { register, handleSubmit, formState: { errors } } = useForm<ICommentForm>();
    const { user } = useUser();

    const onSubmit = async (dataForm: ICommentForm) => {
        console.log(data);
        if (user) {
            const response = await CommentService.createCommentWithRelations(`${process.env.NEXT_PUBLIC_API_URL}`, { content: dataForm.content, traveler: user?.traveler?.id }, data.id, setApiErrors);
            const traveler = await TravelerService.findTravelerById(`${process.env.NEXT_PUBLIC_API_URL}`, `${user?.traveler?.id}`, setApiErrors);
            console.log({...response, traveler: traveler});
            if(response) {
                setData({...data, comments: [...comments, {...response, traveler: traveler}]});
            }
        };
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 lg:mt-12 shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight">
            <ul className="mb-4 xl:flex xl:justify-between w-full">
                <li className="flex justify-between items-center mb-4 lg:mb-0 xl:w-5/12 xl:mr-8 w-full">
                    <p>Criteria 1</p>
                    <p>4/10</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
                <li className="flex justify-between items-center xl:w-5/12 xl:mr-8 mb-4 lg:mb-0 w-full">
                    <p>Criteria 2</p>
                    <p>4/10</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
                <li className="flex justify-between items-center  xl:w-5/12 xl:mr-8 mb-4 lg:mb-0 w-full">
                    <p>Criteria 3</p>
                    <p>4/10</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
                <li className="flex justify-between items-center  xl:w-5/12 xl:mr-8 mb-4 lg:mb-0 w-full">
                    <p>Criteria 4</p>
                    <p>4/10</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
                <li className="flex justify-between items-center xl:w-5/12 w-full">
                    <p>Criteria 5</p>
                    <p>4/10</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
            </ul>
            <div className="">
                <textarea
                    {...register("content", {
                        required: "Content is required",
                    })}
                    id="search"
                    onClick={() => setApiErrors({})}
                    placeholder="Add a comment..."
                    className="w-full h-20 resize-none focus:outline-none focus:shadow-outline"
                />
                {errors.content && <p className="mt-2 text-red-500 text-xs italic">{errors.content.message?.toString()}</p>}
            </div>
            <div className="flex justify-end items-center">
                <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                ><Icon icon="ic:sharp-send" />
                </button>
            </div>
        </form>
    );
};