import { GeocoderService } from "@travel-tailor/services";
import { FC, useMemo, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface ICreateActivityForm {
    name: string;
    image: FileList;
    location: string;
    duration: number;
    content: string;
    opening_at: string;
    closing_at: string;
    date: string;
    recurrence: boolean;
}

interface IProps {
    address: string;
    setAddress: UseFormSetValue<ICreateActivityForm>
}

export const Autocomplete: FC<IProps> = ({ address, setAddress }) => {
    const [results, setResults] = useState<any[]>([]);

    useMemo(async () => {
        const tiimeout = setTimeout(async () => {
            await GeocoderService.searchCity(address, `${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`, setResults);
        }, 1000);
    }, [address]);

    return (
        <ul className={`shadow ${address.length > 0 ? 'border-l border-r border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' : ''}`}>
            {results.map((result) => <li key={result.id} className="my-2 hover:bg-blue-100" onClick={() => setAddress('location', result.place_name)}>
                {result.place_name}
            </li>)}
        </ul>
    );
}