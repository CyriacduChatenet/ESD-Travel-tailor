import { Activity, ActivityClosingDay, ActivitySchedule, ActivityTag, Advertiser } from "@/../../packages/types/src";
import moment from "moment";
import { FC } from "react";

interface IProps {
    data: Advertiser[];
}

export const AdvertiserTable: FC<IProps> = ({ data }) => {
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
                {data.map((advertiser: Advertiser) =>
                    <tr key={advertiser.id}>
                        <td className="py-2 px-4 border-b">{advertiser.id}</td>
                        <td className="py-2 px-4 border-b">{advertiser.name}</td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b">{moment(advertiser.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-2 px-4 border-b"></td>
                    </tr>)}
            </tbody>
        </table>

    );
};