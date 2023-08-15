import { useRouter, usePathname } from "next/navigation";
import { FC, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { AdvertiserService, UserService } from "@travel-tailor/services";
import { ROUTES } from "@travel-tailor/constants";
import { Player } from "@lottiefiles/react-lottie-player";

interface ICreateAdvertiserForm {
  name: string;
  location: string;
}

interface IProps {
  token: string;
}

export const CreateAdvertiserForm: FC<IProps> = ({ token }) => {
  const [apiErrors, setApiErrors] = useState<any>({
    cause: "",
    name: "",
    message: "",
  });
  const [submit, setSubmit] = useState<boolean>(false);
  const [address, setAddress] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateAdvertiserForm>();

  const router = useRouter();
  const params = usePathname();

  const handleRedirect = async (advertiserId: string) => {
    router.push(`${ROUTES.ADVERTISER.PAYMENT}/${advertiserId}`);
  };

  const handleLocationChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setAddress(value);
  };

  const onSubmit = async (data: ICreateAdvertiserForm) => {
    const advertiser = await AdvertiserService.createAdvertiser(
      String(process.env.NEXT_PUBLIC_API_URL),
      data,
      setApiErrors,
      token
    );
    await UserService.updateUser(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      params.substring(19, 100),
      { advertiser: advertiser.id },
      setApiErrors
    );
    handleRedirect(`${advertiser.id}`);
  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 col-span-4 md:col-span-8 xl:col-span-12 xl:row-span-6">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create advertiser
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2.5">
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                name="name"
                id="name"
                aria-label="Name input"
                autoComplete="name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-red-500 text-xs italic">
                {errors.name?.message?.toString()}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="location"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Location
            </label>
            <div className="mt-2.5">
              <input
                {...register("location", {
                  required: "Location is required",
                })}
                type="text"
                name="location"
                id="location"
                autoComplete="location"
                aria-label="Location input"
                onChange={handleLocationChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.location && (
              <p className="mt-2 text-red-500 text-xs italic">
                {errors.location?.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            aria-live="assertive"
            aria-label="Create advertiser"
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
              <>Create advertiser</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
