import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthService } from "@travel-tailor/services";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@travel-tailor/constants";
import { Player } from "@lottiefiles/react-lottie-player";

interface IResetPasswordForm {
    password: string
}

export const ResetPasswordForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ message?: string }>({});
    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IResetPasswordForm>();
    const router = useRouter();
    const routeParams = useParams();

    const onSubmit = async (data: IResetPasswordForm) => {
        const response = await AuthService.resetPassword(`${process.env.NEXT_PUBLIC_API_URL}`, routeParams.id, data, setApiErrors);
        if (response) {
            router.push(ROUTES.AUTH.SIGNIN);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 col-span-4 md:col-span-8 xl:col-span-12 xl:row-span-6">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset password
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  {...register("password", { required: "Password is required" })}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="mt-2 text-red-500 text-xs italic">
                    {errors.password.message?.toString()}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-cyan-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                {submit ? (
                  <Player
                    src="https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json"
                    className="w-5 h-5"
                    loop
                    autoplay
                  />
                ) : (
                  <>Reset password</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};