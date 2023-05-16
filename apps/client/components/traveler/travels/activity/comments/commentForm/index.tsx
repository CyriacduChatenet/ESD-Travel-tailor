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
            <div className="">
                <input
                    {...register("comment", {
                        required: "Content is required",
                    })}
                    id="search"
                    type="text"
                    onClick={() => setApiErrors({})}
                    placeholder="Add a comment..."
                />
                {errors.comment && <p className="mt-2 text-red-500 text-xs italic">{errors.comment.message?.toString()}</p>}
            </div>
            <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            ><Icon icon="ic:sharp-send" />
            </button>
        </form>
    );
};