import { Activity, ActivityClosingDay, ActivitySchedule, ActivityTag } from "@/../../packages/types/src";
import moment from "moment";
import { FC } from "react";

interface IProps {
    data: Activity[];
}

export const ActivityTable: FC<IProps> = ({ data }) => {
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
                {data.map((activity: Activity) =>
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
                        <td className="py-2 px-4 border-b">{activity.tags.map((tag: ActivityTag) => <span key={tag.id} className="bg-blue-100 rounded-lg text-blue-500 py-1 px-2">{tag.name}</span>)}</td>
                        <td className="py-2 px-4 border-b">{moment(activity.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-2 px-4 border-b"></td>
                    </tr>)}
            </tbody>
        </table>

    );
};