import React, { FC, useState } from "react";
import Link from "next/link";
import { Switch } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  AuthService,
  UserService,
} from "@travel-tailor/services";
import { API_SIGNUP_ROUTE, ROLES, ROUTES } from "@travel-tailor/constants";
import { User } from "@travel-tailor/types";
import { Player } from "@lottiefiles/react-lottie-player";

interface ISignupForm {
  username: string;
  email: string;
  password: string;
  roles: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const SignupForm: FC = () => {
  const [apiErrors, setApiErrors] = useState<Error>({
    cause: "",
    name: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submit, setSubmit] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>();
  const router = useRouter();

  const handleRedirect = async (user: User, data: ISignupForm) => {
    if (data.roles === ROLES.TRAVELER) {
      router.push(`${ROUTES.TRAVELER.TASTE.CREATE}/${user?.traveler?.id}`);
    }

    if (data.roles === ROLES.ADVERTISER) {
      router.push(`${ROUTES.ADVERTISER.CREATE_ADVERTISER}/${user.id}`);
    }

    if (data.roles === ROLES.ADMIN) {
      router.push(ROUTES.AUTH.SIGNIN);
    }
  };

  const onSubmit = async (data: ISignupForm) => {
    const response = await AuthService.signup(
      `${process.env.NEXT_PUBLIC_API_URL}${API_SIGNUP_ROUTE}`,
      data,
      setApiErrors
    );
    if (response) {
      await UserService.getUserInfo(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        setApiErrors
      ) as User;
      await handleRedirect(response, data);
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
          Sign up
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2.5">
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.username && (
              <p className="mt-2 text-red-500 text-xs italic">
                {errors.username?.message?.toString()}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-red-500 text-xs italic">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                name="password"
                id="password"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-red-500 text-xs italic">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>
          <div className="mb-4 sm:col-span-2">
                    <label htmlFor="role" className="block text-sm font-semibold leading-6 text-gray-900">
                        Role
                    </label>
                    <select
                        {...register("roles", { required: "Role is required" })}
                        id="role"
                        onClick={() => setApiErrors({ message: "", name: "", cause: ""})}
                        className="block w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    >
                        <option value="">Select role</option>
                        <option value="traveler">Traveler</option>
                        <option value="advertiser">Advertiser</option>
                    </select>
                    {errors.roles && <p className="text-red-500 text-xs italic">{errors.roles?.message?.toString()}</p>}
                </div>
          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-cyan-600" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <Link href={ROUTES.TERMS_AND_CONDITIONS} className="font-semibold text-cyan-600">
                privacy&nbsp;policy
              </Link>
            </Switch.Label>
          </Switch.Group>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            aria-live="assertive"
            aria-label="Signup"
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
              <>Signup</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
