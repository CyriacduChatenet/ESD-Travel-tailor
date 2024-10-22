import { CommentService } from "@travel-tailor/services";
import { Activity, User } from "@travel-tailor/types";
import { Icon } from "@iconify/react";
import moment from "moment";
import { FC, SetStateAction, useState, Dispatch } from "react";
import { useForm } from "react-hook-form";

interface IProps {
    id: string;
    author: string;
    role: string;
    content: string;
    createdAt: Date;
    user: User
    data: Activity;
    setData: Dispatch<SetStateAction<Activity>>;
}

interface ICommentForm {
    content: string;
}

export const Comment: FC<IProps> = ({ author, role, content, createdAt, user, id, data, setData }) => {
    const [apiError, setApiError] = useState({});
    const [editor, setEditor] = useState(false);
    
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ICommentForm>();

    const handleDelete = async (id: string) => {
        const response = await CommentService.deleteComment(`${process.env.NEXT_PUBLIC_API_URL}`, id, setApiError);
        if (response) {
            setData({ ...data, comments: data.comments.filter(comment => comment.id !== id) })
        }
    };

    const handleUpdate = async (dataForm: ICommentForm) => {
        const response = await CommentService.updateComment(`${process.env.NEXT_PUBLIC_API_URL}`, id, { content: dataForm.content }, setApiError);
        if (response) {
            setData({ ...data, comments: data.comments.map(comment => comment.id === id ? { ...comment, content: dataForm.content } : comment) })
            setEditor(false);
        }
    };

    const handleEditor = () => {
        setEditor(!editor);
        if (editor === true) {
            setValue('content', content);
        }
    }

    return (
        <li className="shadow appearance-none border rounded w-full py-4 px-6 my-4 text-gray-700 leading-tight" role="listitem">
            <div className="flex justify-between items-center w-full">
                <div className="flex justify-center items-center w-8 h-8 rounded-full bg-gray-400 text-white">
                    <Icon icon="material-symbols:person" className="w-6 h-6" aria-label="User Icon" />
                </div>
                <p className="w-full flex justify-around items-center">
                    <span className="flex justify-around items-center w-1/3">
                        <span className="font-bold">{author}</span><div className="hidden lg:block font-normal italic"><span>{role}</span></div>
                    </span>
                    <span className="italic text-gray-400">{moment(createdAt).startOf('seconds').fromNow()}</span>
                </p>
                {(user.traveler !== null && user.traveler !== undefined) && user.traveler.comments.find(comment => comment.id === id) && <div className="flex">
                    <button onClick={handleEditor} aria-label="Edit comment">{editor ? 'Cancel' : 'Edit'}</button>
                    &nbsp;
                    <button onClick={() => handleDelete(id)} aria-label="Delete comment">Delete</button>
                </div>}
            </div>
            <p className="w-full pt-4 text-justify">{editor === false ? content :
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <textarea
                        {...register("content", {
                            required: "Content is required",
                        })}
                        id="search"
                        onClick={() => setApiError({})}
                        placeholder="Edit comment..."
                        className="w-full h-20 resize-none focus:outline-none focus:shadow-outline"
                    />
                    <div className="flex justify-end items-center">
                        <button
                            type="submit"
                            aria-live="assertive"
                            aria-label="Send comment"
                            className={`bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        ><Icon icon="ic:sharp-send" />
                        </button>
                    </div>
                </form>
            }</p>
        </li>
    );
};