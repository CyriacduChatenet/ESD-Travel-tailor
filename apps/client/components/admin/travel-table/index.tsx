import { ROUTES } from "@travel-tailor/constants";
import { AdvertiserService, TravelService } from "@travel-tailor/services";
import { Activity, Advertiser, Travel } from "@travel-tailor/types";
import { Icon } from "@iconify/react";
import { parse } from "cookie";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface IProps {
        data: Travel[];
    setData: Dispatch<SetStateAction<{
        data: Travel[];
    }>>
}

export const TravelTable: FC<IProps> = ({ data, setData }) => {
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleDelete = async (id: string) => {
        const response = await TravelService.deleteTravel(`${process.env.NEXT_PUBLIC_API_URL}`,id, setErrors);
        if(response) {
            setData({...data, data: data.filter((travel: Travel) => travel.id !== id)});
        }
    };

    const handleUpdate = (id: string) => {
        return router.push(`${ROUTES.TRAVELER.TRAVEL.EDIT}/${id}`);
    };

    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Id</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Departure date</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Return date</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Departure city</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Destination city</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Created</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((travel: Travel) =>
                    <tr key={travel.id}>
                        <td className="py-2 px-4 border-b">{travel.id}</td>
                        <td className="py-2 px-4 border-b">{travel.departureDate}</td>
                        <td className="py-2 px-4 border-b">{travel.returnDate}</td>
                        <td className="py-2 px-4 border-b">{travel.departureCity}</td>
                        <td className="py-2 px-4 border-b">{travel.destinationCity}</td>
                        <td className="py-2 px-4 border-b">{moment(travel.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-2 px-4 border-b">
                            <div className="w-full h-full flex">
                                <button onClick={() => handleUpdate(String(travel.id))}>
                                    <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                </button>
                                <button onClick={() => handleDelete(String(travel.id))}>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    );
};