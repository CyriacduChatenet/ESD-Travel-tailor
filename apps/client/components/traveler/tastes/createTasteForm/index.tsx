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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTasteForm>();

  const handleTasteInputChange = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    await TasteService.createTasteWithRelation(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      tastes,
      routeParams.substring(23, 100),
      setApiErrors
    );
    setTastes([...tastes, { name: value }]);
  };

  const handleDelete = async (id: string, index: number) => {
    await TasteService.deleteTaste(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      id,
      setApiErrors
    );
    setTastes(tastes.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    setSubmit(true);
    if (tastes.length > 0) {
      await TasteService.createTasteWithRelation(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        tastes,
        routeParams.substring(23, 100),
        setApiErrors
      );
      if (TokenService.getAccessToken()) {
        router.push(ROUTES.TRAVELER.DASHBOARD);
      } else {
        router.push(ROUTES.AUTH.SIGNIN);
      }
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 col-span-4 md:col-span-8 xl:col-span-12 xl:row-span-6">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create Taste
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="w-full">
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
                autoComplete="off"
                onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                  setTimeout(() => {
                    handleTasteInputChange(e);
                  }, 2000);
                }}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.name && (
              <p className="mt-2 text-red-500 text-xs italic">
                {errors.name?.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="mt-8">
            {tastes.map((taste: Taste, index: number) => (
              <div
                key={index}
                className="flex justify-around items-center rounded-full bg-cyan-600 text-white my-2"
              >
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
        <div className="mt-10">
          <button
            type="submit"
            aria-live="assertive"
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
              <>Add tastes</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
