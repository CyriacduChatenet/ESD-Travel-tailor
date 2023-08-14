import { Dispatch, FC, SetStateAction, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { Activity, Comment } from "@travel-tailor/types";
import { useUser } from "@travel-tailor/contexts";
import { CommentService, TravelerService } from "@travel-tailor/services";

interface IProps {
    data: Activity;
    setData: Dispatch<SetStateAction<Activity>>;
    comments: Comment[];
}

interface ICommentForm {
    content: string;
    rentability: number,
    place: number,
    waiting: number,
    explanation: number,
    arrival: number,
}

export const CommentForm: FC<IProps> = ({ data, setData, comments }) => {
    const [apiErrors, setApiErrors] = useState<any>();

    const { register, handleSubmit, formState: { errors } } = useForm<ICommentForm>();
    const { user } = useUser();

    const onSubmit = async (dataForm: ICommentForm) => {
        if (user) {
            const response = await CommentService.createCommentWithRelations(`${process.env.NEXT_PUBLIC_API_URL}`, { content: dataForm.content, traveler: user?.traveler?.id, marks: { rentability: Number(dataForm.rentability), place: Number(dataForm.place), waiting: Number(dataForm.waiting), explanation: Number(dataForm.explanation), arrival: Number(dataForm.arrival) } }, data.id, setApiErrors);
            const traveler = await TravelerService.findTravelerById(`${process.env.NEXT_PUBLIC_API_URL}`, `${user?.traveler?.id}`, setApiErrors);
            if (response) {
                setData({ ...data, comments: [...comments, { ...response, traveler: traveler }] });
            }
        };
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 lg:mt-12 shadow appearance-none border rounded w-full py-4 px-6 text-gray-700 leading-tight">
            <ul className="mb-4 xl:flex xl:justify-between w-full">
                <li className="flex justify-between items-center mb-4 lg:mb-0 xl:w-5/12 xl:mr-8 w-full">
                    <p>Rentability</p>
                    &nbsp;
                    <p className="flex">
                        <input type="number" {...register("rentability", {
                            min: 0,
                            max: 5,
                            required: "Rentability is required",
                        })} className="w-6" />
                        /5</p>
                    <Icon icon="material-symbols:star-rate" aria-label="Star Icon" />
                </li>
                <li className="flex justify-between items-center xl:w-5/12 xl:mr-8 mb-4 lg:mb-0 w-full">
                    <p>Place</p>
                    &nbsp;
                    <p className="flex">
                        <input type="number" {...register("place", {
                            min: 0,
                            max: 5,
                            required: "Place is required",
                        })} className="w-6" />
                        /5</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
                <li className="flex justify-between items-center  xl:w-5/12 xl:mr-8 mb-4 lg:mb-0 w-full">
                    <p>Waiting</p>
                    &nbsp;
                    <p className="flex">
                        <input type="number" {...register("waiting", {
                            min: 0,
                            max: 5,
                            required: "Waiting is required",
                        })} className="w-6" />
                        /5</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
                <li className="flex justify-between items-center  xl:w-5/12 xl:mr-8 mb-4 lg:mb-0 w-full">
                    <p>Explanation</p>
                    &nbsp;
                    <p className="flex">
                        <input type="number" {...register("explanation", {
                            min: 0,
                            max: 5,
                            required: "Explanation is required",
                        })} className="w-6" />/5</p>
                    <Icon icon="material-symbols:star-rate" />
                </li>
                <li className="flex justify-between items-center xl:w-5/12 w-full">
                    <p>Arrival</p>
                    &nbsp;
                    <p className="flex">
                        <input type="number" {...register("arrival", {
                            min: 0,
                            max: 5,
                            required: "Arrival is required",
                        })} className="w-6" />
                        /5</p>
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
                <ul>
                    {errors.content && <li className="text-red-500">{errors.content.message}</li>}
                    {errors.rentability && <li className="text-red-500">{errors.rentability.message}</li>}
                    {errors.place && <li className="text-red-500">{errors.place.message}</li>}
                    {errors.waiting && <li className="text-red-500">{errors.waiting.message}</li>}
                    {errors.explanation && <li className="text-red-500">{errors.explanation.message}</li>}
                    {errors.arrival && <li className="text-red-500">{errors.arrival.message}</li>}
                </ul>
            </div>
            <div className="flex justify-end items-center">
                <button
                    type="submit"
                    aria-live="assertive"
                    aria-label="Send comment"
                    className={`bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                ><Icon icon="ic:sharp-send" aria-label="Send Icon" />
                </button>
            </div>
        </form>
    );
};