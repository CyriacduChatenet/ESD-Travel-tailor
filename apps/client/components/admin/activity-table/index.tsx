import { ROUTES } from "@travel-tailor/constants";
import { ActivityService } from "@travel-tailor/services";
import { Activity, ActivityClosingDay, ActivitySchedule, ActivityTag } from "@travel-tailor/types";
import { Icon } from "@iconify/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface IProps {
    data: {
        page: number;
        limit: number;
        total: number;
        data: Activity[];
    };
    setData: Dispatch<SetStateAction<{
        page: number;
        limit: number;
        total: number;
        data: Activity[];
    }>>
}

export const ActivityTable: FC<IProps> = ({ data, setData }) => {
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const response = await ActivityService.deleteActivity(`${process.env.NEXT_PUBLIC_API_URL}`, id, errors);
        if(response) {
            setData({...data, data: data.data.filter((activity: Activity) => activity.id !== id)});
        }
    }

    const handleUpdate = async (slug: string) => {
        return router.push(`${ROUTES.ACTIVITY.EDIT}/${slug}`)
    };

    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Id</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Name</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Duration</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Location</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Image</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Schedules</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">ClosingDays</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Tags</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Created</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b"></th>
                </tr>
            </thead>
            <tbody>
                {data.data.map((activity: Activity) =>
                    <tr key={activity.id}>
                        <td className="py-2 px-4 border-b">{activity.id}</td>
                        <td className="py-2 px-4 border-b">{activity.name}</td>
                        <td className="py-2 px-4 border-b">{activity.detail.duration}h</td>
                        <td className="py-2 px-4 border-b">{activity.detail.location}</td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b">{activity.detail.schedules?.map((schedule: ActivitySchedule) =>
                            <span key={schedule.id}>{schedule.opening_at} - {schedule.closing_at}</span>)}
                        </td>
                        <td className="py-2 px-4 border-b">{activity.detail.closingDays?.map((closingDay: ActivityClosingDay) =>
                            <span key={closingDay.id}>{moment(closingDay.date).format('DD/MM/YYYY')}</span>)}
                        </td>
                        <td className="py-2 px-4 border-b">{activity.tags.map((tag: ActivityTag) => <span key={tag.id} className="bg-blue-100 rounded-lg text-cyan-600 py-1 px-2">{tag.name}</span>)}</td>
                        <td className="py-2 px-4 border-b">{moment(activity.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-8 px-4 border-b">
                            <div className="w-full h-full flex">
                                <button onClick={() => handleUpdate(activity.slug)}>
                                    <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                </button>
                                <button onClick={() => handleDelete(activity.id)}>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    );
};