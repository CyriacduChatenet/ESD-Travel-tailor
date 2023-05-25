import { Activity, ActivityTag } from "@/../../packages/types/src";
import { Icon } from "@iconify/react";
import moment from "moment";
import { FC } from "react";

interface IProps {
    data: ActivityTag[];
}

export const TagTable: FC<IProps> = ({ data }) => {
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
                {data.map((tag: ActivityTag) =>
                    <tr key={tag.id}>
                        <td className="py-2 px-4 border-b">{tag.id}</td>
                        <td className="py-2 px-4 border-b">{tag.name}</td>
                        <td className="py-2 px-4 border-b">{tag.activities?.map((activity: Activity) => <span key={activity.id}>{activity.id}</span>)}</td>
                        <td className="py-2 px-4 border-b">{moment(tag.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-8 px-4 border-b">
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