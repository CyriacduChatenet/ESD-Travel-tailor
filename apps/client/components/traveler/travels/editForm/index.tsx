import { useUser } from "@travel-tailor/contexts";
import { PlanningService } from "@travel-tailor/services";
import { Player } from "@lottiefiles/react-lottie-player";
import { FC, useCallback, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN, ROLES, ROUTES } from "@travel-tailor/constants";
import Cookies from "js-cookie";
import { jwtDecode } from "@/../../packages/functions/src";
import { AccessToken } from "@/../../packages/types/src";

interface IEditTravelForm {
    departureCity: string
    destinationCity: string
    departureDate: Date
    returnDate: Date
}


export const EditTravelForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ status?: number }>({});
    const [submit, setSubmit] = useState<boolean>(false);
    const [travel_id, setTravel_id] = useState("");

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IEditTravelForm>();
    const { user, setUser } = useUser();
    const router = useRouter();

    const onSubmit = useCallback(async (data: IEditTravelForm) => {
        setSubmit(true);
        const response = await PlanningService.updateTravelSpec(`${process.env.NEXT_PUBLIC_API_URL}`, `${travel_id}`, data)
        if(response) {
            setSubmit(false);
            const token = jwtDecode(`${Cookies.get(ACCESS_TOKEN)}`) as AccessToken;

            if(token.roles === ROLES.TRAVELER) {
                router.push(ROUTES.TRAVELER.DASHBOARD)
            }

            if(token.roles === ROLES.ADMIN) {
                router.push(ROUTES.ADMIN.TRAVEL)
            }
        }
    }, [user]);

    useEffect(() => {
        setTravel_id(window.location.pathname.split('/')[4]);
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:justify-between lg:items-center py-8">
        <div className="mb-4">
            <label htmlFor="departureCity" className="block text-gray-700 font-bold mb-2">
            Departure city
            </label>
            <input
                {...register("departureCity", {
                    required: "DepartureCity is required",
                })}
                id="departureCity"
                type="text"
                aria-label="Departure city input"
                onClick={() => setApiErrors({})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.departureCity && <p className="mt-2 text-red-500 text-xs italic">{errors.departureCity?.message?.toString()}</p>}
        </div>
        <div className="mb-4">
            <label htmlFor="destinationCity" className="block text-gray-700 font-bold mb-2">
            Destination city
            </label>
            <input
                {...register("destinationCity", {
                    required: "DestinationCity is required",
                })}
                id="destinationCity"
                type="text"
                aria-label="Destination city input"
                onClick={() => setApiErrors({})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.destinationCity && <p className="mt-2 text-red-500 text-xs italic">{errors.destinationCity?.message?.toString()}</p>}
        </div>
        <div className="mb-4">
            <label htmlFor="departureDate" className="block text-gray-700 font-bold mb-2">
            Departure date
            </label>
            <input
                {...register("departureDate", {
                    required: "DepartureDate is required",
                })}
                id="departureDate"
                type="date"
                aria-label="Departure date input"
                onClick={() => setApiErrors({})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.departureDate && <p className="mt-2 text-red-500 text-xs italic">{errors.departureDate?.message?.toString()}</p>}
        </div>
        <div className="mb-4">
            <label htmlFor="returnDate" className="block text-gray-700 font-bold mb-2">
            Return date
            </label>
            <input
                {...register("returnDate", {
                    required: "ReturnDate is required",
                })}
                id="returnDate"
                type="date"
                aria-label="Return date input"
                onClick={() => setApiErrors({})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.returnDate && <p className="mt-2 text-red-500 text-xs italic">{errors.returnDate?.message?.toString()}</p>}
        </div>
        <div className="flex flex-col items-center justify-between">
            <button
                type="submit"
                aria-live="assertive"
                aria-label="Edit travel"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {submit ? <Player
                        src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                        className="w-5 h-5"
                        loop
                        autoplay
                    /> : <>Edit Travel</>}
            </button>
        </div>
    </form>
    );
};