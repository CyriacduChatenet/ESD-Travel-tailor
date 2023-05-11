'use client'

import React, { ChangeEvent, FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { TasteService } from "@/../../packages/services/src";
import { API_TASTE_ROUTE, ROUTES } from "@/../../packages/constants/src";

interface ICreateTasteForm {
    name: string;
}

export const CreateTasteForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ status?: number }>({});
    const [tags, setTags] = useState<{ name: string }[]>([]);
    const [submit, setSubmit] = useState<boolean>(false);

    const router = useRouter();

    const handleChange = async (e: any) => {
        e.preventDefault();
        const { value } = e.target;
        setTags([...tags, { name: value }]);
        await TasteService.createTasteWithRelation(`${process.env.NEXT_PUBLIC_API_URL}${API_TASTE_ROUTE}`, tags, '1', setApiErrors);
    };

    const handleSubmit = () => {
        setSubmit(true);
        if(tags.length > 0 && Number(apiErrors.status) < 400) {
            router.push(ROUTES.TRAVELER.DASHBOARD);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                Tastes
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
                <form action="">
                    <div>
                        {tags.map((tag, index) => (
                            <div key={index} className="flex justify-around items-center rounded-full bg-blue-500 text-white my-2">
                                <p>{tag.name}</p>
                                <button
                                    className="text-white font-bold py-2 px-4"
                                    onClick={() => setTags(tags.filter((_, i) => i !== index))}
                                >
                                    D
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