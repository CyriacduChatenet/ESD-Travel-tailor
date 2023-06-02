import React, { KeyboardEvent, FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TasteService, TokenService } from "@travel-tailor/services";
import { Taste } from "@travel-tailor/types";
import { ROUTES } from "@travel-tailor/constants";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";

interface ICreateTasteForm {
    name: string;
}

export const CreateTasteForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ status?: number }>({});
    const [tastes, setTastes] = useState<{ name: string }[]>([]);
    const [submit, setSubmit] = useState<boolean>(false);

    const router = useRouter();
    const routeParams = usePathname();
    const { register, handleSubmit, formState: { errors } } = useForm<ICreateTasteForm>();

    const handleTasteInputChange = async (e: KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value } = e.target as HTMLInputElement;
        await TasteService.createTasteWithRelation(`${process.env.NEXT_PUBLIC_API_URL}`, tastes, routeParams.substring(23, 100), setApiErrors);
        setTastes([...tastes, { name: value }]);
    };

    const handleDelete = async (id: string, index: number) => {
        await TasteService.deleteTaste(`${process.env.NEXT_PUBLIC_API_URL}`, id, setApiErrors);
        setTastes(tastes.filter((_, i) => i !== index))
    };

    const onSubmit = async () => {
        setSubmit(true);
        if (tastes.length > 0) {
            await TasteService.createTasteWithRelation(`${process.env.NEXT_PUBLIC_API_URL}`, tastes, routeParams.substring(23, 100), setApiErrors);
            const timeout = setTimeout(() => {
                if(TokenService.getAccessToken()) {
                    router.push(ROUTES.TRAVELER.DASHBOARD);
                } else {
                    router.push(ROUTES.AUTH.SIGNIN);
                }
            }, 2000);
            return () => clearTimeout(timeout);
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
                        {tastes.map((taste: Taste, index: number) => (
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
                            {...register("name", {
                                required: "Taste is required",
                            })}
                            id="name"
                            type="text"
                            onClick={() => setApiErrors({})}
                            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => { setTimeout(() => { handleTasteInputChange(e) }, 2000) }}
                        />
                    </div>
                </form>
            </div>
            {submit === true && tastes.length === 0 ? (
                <p className="text-red-500 text-xs italic">Tags musn&apos;t be empty</p>
            ) : null}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit(onSubmit)}
            >
                {submit ? <Player
                    src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                    className="w-12 h-12"
                    loop
                    autoplay
                /> : <>Add Taste</>}
            </button>
        </div>
    );
};