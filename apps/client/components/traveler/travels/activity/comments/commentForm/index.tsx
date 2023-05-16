import { Icon } from "@iconify/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface ICommentForm {
    comment: string;
}

export const CommentForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<any>();
    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ICommentForm>();

    const onSubmit = async (data: ICommentForm) => {
        console.log(data);
    };

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
                    {...register("comment", {
                        required: "Content is required",
                    })}
                    id="search"
                    onClick={() => setApiErrors({})}
                    placeholder="Add a comment..."
                    className="w-full h-20 resize-none focus:outline-none focus:shadow-outline"
                />
                {errors.comment && <p className="mt-2 text-red-500 text-xs italic">{errors.comment.message?.toString()}</p>}
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