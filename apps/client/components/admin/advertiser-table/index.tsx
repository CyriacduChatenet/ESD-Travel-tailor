import { ROUTES } from "@travel-tailor/constants";
import { AdvertiserService } from "@travel-tailor/services";
import { Activity, Advertiser } from "@travel-tailor/types";
import { Icon } from "@iconify/react";
import { parse } from "cookie";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface IProps {
    data: {
        page: number;
        limit: number;
        total: number;
        data: Advertiser[];
    };
    setData: Dispatch<SetStateAction<{
        page: number;
        limit: number;
        total: number;
        data: Advertiser[];
    }>>
}

export const AdvertiserTable: FC<IProps> = ({ data, setData }) => {
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const cookies = parse(document.cookie);
        const response = await AdvertiserService.deleteAdvertiser(`${process.env.NEXT_PUBLIC_API_URL}`,id, cookies.accessToken, setErrors);
        if(response) {
            setData({...data, data: data.data.filter((advertiser: Advertiser) => advertiser.id !== id)});
        }
    };

    const handleUpdate = (id: string) => {
        return router.push(`${ROUTES.ADVERTISER.EDIT}/${id}`);
    };

    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th scope="col" className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Id</th>
                    <th scope="col" className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Name</th>
                    <th scope="col" className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Location</th>
                    <th scope="col" className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Activity</th>
                    <th scope="col" className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Created</th>
                    <th scope="col" className="py-2 px-4 bg-gray-100 text-gray-500 border-b"></th>
                </tr>
            </thead>
            <tbody>
                {data.data.map((advertiser: Advertiser) =>
                    <tr key={advertiser.id}>
                        <td className="py-2 px-4 border-b">{advertiser.id}</td>
                        <td className="py-2 px-4 border-b">{advertiser.name}</td>
                        <td className="py-2 px-4 border-b">{advertiser.location}</td>
                        <td className="py-2 px-4 border-b">{advertiser.activities?.map((activity: Activity) => <><Link href={ROUTES.ADMIN.ACTIVITIES} className="text-cyan-600 hover:text-cyan-500 underline" key={activity.id}>{activity.id}</Link><br /></>)}</td>
                        <td className="py-2 px-4 border-b">{moment(advertiser.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-2 px-4 border-b">
                            <div className="w-full h-full flex">
                                <button onClick={() => handleUpdate(String(advertiser.id))} aria-label={`Edit advertiser ${advertiser.name}`}>
                                    <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                </button>
                                <button onClick={() => handleDelete(String(advertiser.id))} aria-label={`Delete advertiser ${advertiser.name}`}>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    );
};