import { ROUTES } from "@/../../packages/constants/src";
import { Activity, Advertiser } from "@/../../packages/types/src";
import { Icon } from "@iconify/react";
import moment from "moment";
import Link from "next/link";
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
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Location</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Activity</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Created</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((advertiser: Advertiser) =>
                    <tr key={advertiser.id}>
                        <td className="py-2 px-4 border-b">{advertiser.id}</td>
                        <td className="py-2 px-4 border-b">{advertiser.name}</td>
                        <td className="py-2 px-4 border-b">{advertiser.location}</td>
                        <td className="py-2 px-4 border-b">{advertiser.activities?.map((activity: Activity) => <><Link href={ROUTES.ADMIN.ACTIVITIES} className="text-blue-500 hover:text-blue-700 underline" key={activity.id}>{activity.id}</Link><br /></>)}</td>
                        <td className="py-2 px-4 border-b">{moment(advertiser.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-2 px-4 border-b">
                            <div className="w-full h-full flex">
                                <button>
                                    <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                </button>
                                <button>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    );
};