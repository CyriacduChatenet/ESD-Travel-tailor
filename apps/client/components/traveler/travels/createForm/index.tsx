import { useUser } from "@travel-tailor/contexts";
import { TravelService } from "@travel-tailor/services";
import { Player } from "@lottiefiles/react-lottie-player";
import { FC, SetStateAction, useCallback, useState, Dispatch } from "react";
import { set, useForm } from "react-hook-form";
import { Travel } from "@travel-tailor/types";

interface ICreateTravelForm {
  departureCity: string;
  destinationCity: string;
  departureDate: Date;
  returnDate: Date;
}

interface IProps {
  data: {
    page: number;
    limit: number;
    total: number;
    data: Travel[];
  };
  setData: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
      total: number;
      data: Travel[];
    }>
  >;
}

export const CreateTravelForm: FC<IProps> = ({ data, setData }) => {
  const [apiErrors, setApiErrors] = useState<{ status?: number }>({});
  const [submit, setSubmit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateTravelForm>();
  const { user, setUser } = useUser();

  const onSubmit = useCallback(
    async (d: ICreateTravelForm) => {
      setSubmit(true);
      const t = await TravelService.createTravel(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        { ...d, traveler: user?.traveler?.id },
        setApiErrors
      );
      setData({ ...data, data: [t, ...data.data] });
      setUser({ ...user, travels: data.data });
      setValue("departureCity", "");
      setValue("destinationCity", "");
      setSubmit(false);
    },
    [user]
  );

  return (
    <div className="isolate bg-white px-6 py-8 sm:py-8 w-full">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row justify-between items-center"
    >
      <div className="grid grid-cols-1 gap-x-1 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="departureCity"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Departure city
          </label>
          <div className="mt-2.5">
            <input
              {...register("departureCity", {
                required: "Departure city is required",
              })}
              type="text"
              name="departureCity"
              id="departureCity"
              autoComplete="departureCity"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.departureCity && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.departureCity?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-1 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="destinationCity"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Destination city
          </label>
          <div className="mt-2.5">
            <input
              {...register("destinationCity", {
                required: "Destination city is required",
              })}
              type="text"
              name="destinationCity"
              id="destinationCity"
              autoComplete="destinationCity"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.destinationCity && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.destinationCity?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-1 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="departureDate"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Departure date
          </label>
          <div className="mt-2.5">
            <input
              {...register("departureDate", {
                required: "Departure date is required",
              })}
              type="date"
              name="departureDate"
              id="departureDate"
              autoComplete="departureDate"
              className="block w-full rounded-md border-0 px-9 lg:px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.departureDate && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.departureDate?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-x-1 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label
            htmlFor="returnDate"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Return date
          </label>
          <div className="mt-2.5">
            <input
              {...register("returnDate", {
                required: "Return date is required",
              })}
              type="date"
              name="returnDate"
              id="returnDate"
              autoComplete="returnDate"
              className="block w-full rounded-md border-0 px-9 lg:px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
            />
          </div>
          {errors.returnDate && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.returnDate?.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
        >
          {submit ? (
            <Player
              src="https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json"
              className="w-5 h-5"
              loop
              autoplay
            />
          ) : (
            <>Create travel</>
          )}
        </button>
      </div>
    </form>
  </div>
  );
};
