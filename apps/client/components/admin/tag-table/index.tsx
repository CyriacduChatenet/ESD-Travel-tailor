import { ROUTES } from "@travel-tailor/constants";
import { ActivityTagService } from "@travel-tailor/services";
import { Activity, ActivityTag } from "@travel-tailor/types";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface IProps {
    data: {
        page: number;
        limit: number;
        total: number;
        data: ActivityTag[];
    };

    setData: Dispatch<SetStateAction<{
        page: number;
        limit: number;
        total: number;
        data: ActivityTag[];
    }>>
}

export const TagTable: FC<IProps> = ({ data, setData }) => {
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const response = await ActivityTagService.deleteActivityTag(`${process.env.NEXT_PUBLIC_API_URL}`, id, errors);
        if(response) {
            setData({...data, data: data.data.filter((tag: ActivityTag) => tag.id !== id)});
        }
    }

    const handleUpdate = async (id: string) => {
        return router.push(`${ROUTES.TAGS.EDIT}/${id}`)
    }

    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Id</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Name</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Activities</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Created</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b"></th>
                </tr>
            </thead>
            <tbody>
                {data.data.map((tag: ActivityTag) =>
                    <tr key={tag.id}>
                        <td className="py-2 px-4 border-b">{tag.id}</td>
                        <td className="py-2 px-4 border-b">{tag.name}</td>
                        <td className="py-2 px-4 border-b">{tag.activities?.map((activity: Activity) => <span key={activity.id}>{activity.id}</span>)}</td>
                        <td className="py-2 px-4 border-b">{moment(tag.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-8 px-4 border-b">
                            <div className="w-full h-full flex">
                                <button onClick={() => handleUpdate(tag.id)}>
                                    <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                </button>
                                <button onClick={() => handleDelete(tag.id)}>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    );
};