import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TasteService } from "@travel-tailor/services";
import { Taste } from "@travel-tailor/types";
import { ROUTES } from "@travel-tailor/constants";
import { Icon } from "@iconify/react";

export const CreateTasteForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ status?: number }>({});
    const [tags, setTags] = useState<{ name: string }[]>([]);
    const [submit, setSubmit] = useState<boolean>(false);

    const router = useRouter();
    const routeParams = usePathname();

    const handleChange = async (e: any) => {
        e.preventDefault();
        const { value } = e.target;
        await TasteService.createTasteWithRelation(`${process.env.NEXT_PUBLIC_API_URL}`, tags, routeParams.substring(23, 100), setApiErrors);
        setTags([...tags, { name: value }]);
    };

    const handleDelete = async (id: string, index: number) => {
        await TasteService.deleteTaste(`${process.env.NEXT_PUBLIC_API_URL}`, id, setApiErrors);
        setTags(tags.filter((_, i) => i !== index))
    };

    const handleSubmit = () => {
        setSubmit(true);
        if (tags.length > 0) {
            router.push(ROUTES.TRAVELER.DASHBOARD);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            <label htmlFor="tastes" className="block text-gray-700 font-bold mb-2">
                Tastes
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                <form action="">
                    <div>
                        {tags.map((taste: Taste, index: number) => (
                            <div key={index} className="flex justify-around items-center rounded-full bg-blue-500 text-white my-2">
                                <p>{taste.name}</p>
                                <button
                                    className="text-white font-bold py-2 px-4"
                                    onClick={() => handleDelete(`${String(taste.id)}`, index)}
                                >
                                    <Icon icon="material-symbols:close-rounded" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <input
                            id="name"
                            type="text"
                            onClick={() => setApiErrors({})}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleChange(e);
                                }
                            }}
                        />
                    </div>
                </form>
            </div>
            {submit === true && tags.length === 0 ? (
                <p className="text-red-500 text-xs italic">Tags musn&apos;t be empty</p>
            ) : null}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
            >
                Add taste
            </button>
        </div>
    );
};