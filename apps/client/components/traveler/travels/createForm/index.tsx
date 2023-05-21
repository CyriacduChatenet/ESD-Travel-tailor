import { useUser } from "@/../../packages/contexts/src";
import { TravelService } from "@/../../packages/services/src";
import { Player } from "@lottiefiles/react-lottie-player";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

interface ICreateTravelForm {
    departureCity: string
    destinationCity: string
    departureDate: Date
    returnDate: Date
}


export const CreateTravelForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ status?: number }>({});
    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateTravelForm>();
    const { user } = useUser();

    const onSubmit = useCallback(async (data: ICreateTravelForm) => {
        setSubmit(true);
        await TravelService.createTravel(`${process.env.NEXT_PUBLIC_API_URL}`, {...data, traveler: user?.traveler?.id}, setApiErrors);
    }, [user]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col xl:flex-row lg:justify-between lg:items-center py-8">
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
                onClick={() => setApiErrors({})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.returnDate && <p className="mt-2 text-red-500 text-xs italic">{errors.returnDate?.message?.toString()}</p>}
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
                    /> : <>Create Travel</>}
            </button>
        </div>
    </form>
    );
};