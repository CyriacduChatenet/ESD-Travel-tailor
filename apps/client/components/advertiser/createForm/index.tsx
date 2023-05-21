import { useRouter, usePathname } from "next/navigation";
import { Dispatch, FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AdvertiserService, UserService } from "@travel-tailor/services";
import { ROUTES } from "@travel-tailor/constants";
import { Player } from "@lottiefiles/react-lottie-player";

interface ICreateAdvertiserForm {
    name: string
    location: string
}

export const CreateAdvertiserForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<Error>({
        cause: "",
        name: "",
        message: "",
    });

    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateAdvertiserForm>();

    const router = useRouter();
    const params = usePathname();

    const handleRedirect = async (advertiserId: string) => {
        router.push(`${ROUTES.ADVERTISER.PAYMENT}/${advertiserId}`)
    }

    const onSubmit = async (data: ICreateAdvertiserForm) => {
        const advertiser = await AdvertiserService.createAdvertiser(`${process.env.NEXT_PUBLIC_API_URL}`, data, setApiErrors);
        if (advertiser && apiErrors.message === undefined) {
            await UserService.updateUser(`${process.env.NEXT_PUBLIC_API_URL}`, params.substring(19, 100), { advertiser: advertiser.id }, setApiErrors);
            handleRedirect(`${advertiser.id}`)
        }
    };
    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name
                    </label>
                    <input
                        {...register("name", {
                            required: "Name is required",
                        })}
                        id="name"
                        type="text"
                        onClick={() => setApiErrors({ message: "", name: "", cause: "" })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && <p className="mt-2 text-red-500 text-xs italic">{errors.name.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                        Address
                    </label>
                    <input
                        {...register("location", {
                            required: "Address is required",
                        })}
                        id="name"
                        type="text"
                        onClick={() => setApiErrors({ message: "", name: "", cause: "" })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.location && <p className="mt-2 text-red-500 text-xs italic">{errors.location.message?.toString()}</p>}
                </div>
                <div className="flex flex-col items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {submit ? <Player
                            src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                            className="w-5 h-5"
                            loop
                            autoplay
                        /> : <>Create Advertiser</>}
                    </button>
                </div>
            </form>
        </div>
    );
}