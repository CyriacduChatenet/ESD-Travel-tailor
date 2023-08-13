import { useRouter, usePathname } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AdvertiserService, UserService } from "@travel-tailor/services";
import { ROLES, ROUTES } from "@travel-tailor/constants";
import { ChangeEvent, jwtDecode } from "@travel-tailor/functions";
import { AccessToken } from "@travel-tailor/types";
import { Player } from "@lottiefiles/react-lottie-player";
import { parse } from "cookie";

import { Autocomplete } from "@/components/autocomplete";

interface IEditAdvertiserForm {
    name: string
    location: string
}

export const EditAdvertiserForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<any>({
        cause: "",
        name: "",
        message: "",
    });
    const [submit, setSubmit] = useState<boolean>(false);
    const [address, setAddress] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<IEditAdvertiserForm>();

    const router = useRouter();
    const params = usePathname();

    const handleLocationChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        setAddress(value);
    };

    const handleRedirect = async (advertiserId: string) => {
        const cookies = document.cookie;
        const cookie = parse(cookies);
        const accessToken = jwtDecode(cookie.accessToken) as AccessToken;

        switch (accessToken.roles) {
            case ROLES.ADMIN:
                router.push(`${ROUTES.ADMIN.ADVERTISER}`);
                break;
            case ROLES.ADVERTISER:
                router.push(`${ROUTES.ADVERTISER.DASHBOARD}`);
                break;
            default:
                router.push(`${ROUTES.ADVERTISER.PAYMENT}/${advertiserId}`)
        }
    }

    const onSubmit = async (data: IEditAdvertiserForm) => {
        const cookies = document.cookie;
        const cookie = parse(cookies);
        const advertiser = await AdvertiserService.updateAdvertiser(`${process.env.NEXT_PUBLIC_API_URL}`, params.substring(19, 100), data, cookie.accessToken, setApiErrors);
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
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                        Location
                    </label>
                    <input
                        {...register("location", {
                            required: "Location is required",
                        })}
                        id="location"
                        type="text"
                        onClick={() => setApiErrors({})}
                        onChange={handleLocationChange}
                        className={`shadow appearance-none border-t ${address.length === 0 ? 'border-r border-l' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.location ? 'border-red-500' : ''}`}
                    />
                    <Autocomplete address={address} setAddress={setAddress} />
                    {errors.location && <p className="mt-2 text-red-500 text-xs italic">{errors.location.message?.toString()}</p>}
                </div>
                <div className="flex flex-col items-center justify-between">
                    <button
                        type="submit"
                        aria-label="Edit advertiser"
                        aria-live="assertive"
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {submit ? <Player
                            src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                            className="w-5 h-5"
                            loop
                            autoplay
                        /> : <>Edit Advertiser</>}
                    </button>
                </div>
            </form>
        </div>
    );
}