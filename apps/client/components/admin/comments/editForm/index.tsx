/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import { CommentService } from "@travel-tailor/services";
import { ROUTES } from "@travel-tailor/constants";

interface IEditCommentForm {
    content: string;
}

export const EditCommentForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ message?: string }>({});
    const [submit, setSubmit] = useState<boolean>(false);
    const [previous, setPrevious] = useState<{ content: string }>({
        content: "",
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IEditCommentForm>();
    const params = usePathname();
    const router = useRouter();

    const handleFetch = async (id: string) => {
        const response = await CommentService.findCommentById(`${process.env.NEXT_PUBLIC_API_URL}`, id, setApiErrors);
        if (response) {
            setPrevious(response);
        }
    };

    const onSubmit = async (data: IEditCommentForm) => {
        setSubmit(true);
        const response = await CommentService.updateComment(`${process.env.NEXT_PUBLIC_API_URL}`, `${window.location.pathname.substring(21, 100)}`, data, setApiErrors);
        if (response) {
            setSubmit(false);
            router.push(ROUTES.ADMIN.COMMENTS.INDEX)
        }
    };

    useEffect(() => {
        handleFetch(window.location.pathname.substring(21, 100));
        setValue("content", previous.content);
    }, []);

    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="Content" className="block text-gray-700 font-bold mb-2">
                        Content
                    </label>
                    <input
                        {...register("content", {
                            required: "Content is required",
                        })}
                        id="name"
                        type="text"
                        onClick={() => setApiErrors({})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.content && <p className="mt-2 text-red-500 text-xs italic">{errors.content.message?.toString()}</p>}
                </div>
                <button
                    type="submit"
                    aria-live="assertive"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {submit ? <Player
                        src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                        className="w-5 h-5"
                        loop
                        autoplay
                    /> : <>Update Comment</>}
                </button>
            </form>
        </div>
    );
};