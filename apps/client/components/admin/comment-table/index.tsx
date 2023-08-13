import { ROUTES } from "@travel-tailor/constants";
import { ActivityService } from "@travel-tailor/services";
import { Comment } from "@travel-tailor/types";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface IProps {
    data: {
        page: number;
        limit: number;
        total: number;
        data: Comment[];
    };
    setData: Dispatch<SetStateAction<{
        page: number;
        limit: number;
        total: number;
        data: Comment[];
    }>>
}

export const CommentTable: FC<IProps> = ({ data, setData }) => {
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const response = await ActivityService.deleteActivity(`${process.env.NEXT_PUBLIC_API_URL}`, id, errors);
        if(response) {
            setData({...data, data: data.data.filter((comment: Comment) => comment.id !== id)});
        }
    }

    const handleUpdate = async (id: string) => {
        return router.push(`${ROUTES.ADMIN.COMMENTS.EDIT}/${id}`)
    };

    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Id</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Name</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Content</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Created</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b"></th>
                </tr>
            </thead>
            <tbody>
                {data.data.map((comment: Comment) =>
                    <tr key={comment.id}>
                        <td className="py-2 px-4 border-b">{comment.id}</td>
                        <td className="py-2 px-4 border-b">{comment?.traveler?.user?.name}</td>
                        <td className="py-2 px-4 border-b">{comment.content}</td>
                        <td className="py-2 px-4 border-b">{moment(comment.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-8 px-4 border-b">
                            <div className="w-full h-full flex">
                                <button onClick={() => handleUpdate(comment.id)} aria-label={`Edit comment ${comment.id}`}
>
                                    <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                </button>
                                <button onClick={() => handleDelete(comment.id)} aria-label={`Delete comment ${comment.id}`}
>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    );
};