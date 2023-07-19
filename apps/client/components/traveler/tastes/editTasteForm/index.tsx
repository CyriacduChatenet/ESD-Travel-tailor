import React, { FC, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TasteService } from "@travel-tailor/services";
import { Taste } from "@travel-tailor/types";
import { ROUTES } from "@travel-tailor/constants";
import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";

interface IEditTasteForm {
    name: string;
}

export const EditTasteForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ status?: number }>({});
    const [submit, setSubmit] = useState<boolean>(false);
    const [taste, setTaste] = useState<Taste>({})

    const router = useRouter();
    const routeParams = usePathname();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IEditTasteForm>();

    const onSubmit = async (data: any) => {
        setSubmit(true);
        await TasteService.updateTaste(`${process.env.NEXT_PUBLIC_API_URL}`, routeParams.substring(23, 100), data, setApiErrors);
        const timeout = setTimeout(() => {
            router.push(ROUTES.TRAVELER.DASHBOARD);
        }, 2000);
        return () => clearTimeout(timeout);
    };

    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            <label htmlFor="tastes" className="block text-gray-700 font-bold mb-2">
                Tastes
            </label>
            <form action="">
                <div>
                    <input
                        {...register("name", {
                            required: "Taste is required",
                        })}
                        id="name"
                        type="text"
                        onClick={() => setApiErrors({})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSubmit(onSubmit)}
                >
                    {submit ? <Player
                        src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                        className="w-12 h-12"
                        loop
                        autoplay
                    /> : <>Add Taste</>}
                </button>
            </form>
        </div>
    );
};