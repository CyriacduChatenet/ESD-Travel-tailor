import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Player } from "@lottiefiles/react-lottie-player";
import { AuthService } from "@travel-tailor/services";
import { API_SIGNIN_ROUTE, ROLES, ROUTES } from "@travel-tailor/constants";
import { AccessToken } from "@travel-tailor/types";
import Cookies from "js-cookie";

interface ISigninForm {
  email: string;
  password: string;
}

export const SigninForm: FC = () => {
  const [apiErrors, setApiErrors] = useState<any>();
  const [submit, setSubmit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISigninForm>();
  const router = useRouter();

  const handleRedirect = async (user: AccessToken) => {
    switch (user.roles) {
      case ROLES.ADMIN:
        router.push(ROUTES.ADMIN.DASHBOARD);
        break;
      case ROLES.TRAVELER:
        router.push(ROUTES.TRAVELER.DASHBOARD);
        break;
      case ROLES.ADVERTISER:
        router.push(ROUTES.ADVERTISER.DASHBOARD);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (data: ISigninForm) => {
    setSubmit(true);
    const response = await AuthService.signin(
      `${process.env.NEXT_PUBLIC_API_URL}${API_SIGNIN_ROUTE}`,
      data,
      setApiErrors
    );
    if (response) {
      Cookies.set("userEmail", response.email);
      handleRedirect(response);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 col-span-4 md:col-span-8 xl:col-span-12 xl:row-span-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="../../../../public/logo.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
                id="email"
                name="email"
                type="email"
                aria-label="Email address input"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="mt-2 text-red-500 text-xs italic">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href={ROUTES.AUTH.FORGOT_PASSWORD}
                  className="font-semibold text-cyan-600 hover:text-cyan-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password", { required: "Password is required" })}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                aria-label="Password input"
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
              aria-live="assertive"
              aria-label="Signin"
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
                <>Signin</>
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href={ROUTES.AUTH.SIGNUP}
            className="font-semibold leading-6 text-cyan-600 hover:text-cyan-500"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};
