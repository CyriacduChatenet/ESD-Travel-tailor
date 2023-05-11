'use client'

import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthService } from "@travel-tailor/services";
import { API_SIGNIN_ROUTE, ROLES, ROUTES } from "@travel-tailor/constants"
import { AccessToken } from "@travel-tailor/types";

interface ISigninForm {
    email: string
    password: string
}

export const SigninForm: FC = () => {
    const [apiErrors, setApiErrors] = useState({});

    const { register, handleSubmit, formState: { errors } } = useForm<ISigninForm>();
    const router = useRouter();

    const handleRedirect = async (user: AccessToken) => {
        if (user.roles === ROLES.ADMIN) {
          router.push(ROUTES.ADMIN.DASHBOARD)
        } else if (user.roles === ROLES.TRAVELER) {
          router.push(ROUTES.TRAVELER.DASHBOARD)
        } else if (user.roles === ROLES.ADVERTISER) {
          router.push(ROUTES.ADVERTISER.DASHBOARD)
        }
      }

    const onSubmit = async (data: ISigninForm) => {
        const response = await AuthService.signin( `${process.env.NEXT_PUBLIC_API_URL}${API_SIGNIN_ROUTE}`,data, setApiErrors);
        if (response) {
            handleRedirect(response)
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email
                    </label>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email is invalid",
                            },
                        })}
                        id="email"
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.email && <p className="mt-2 text-red-500 text-xs italic">{errors.email.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        {...register("password", { required: "Password is required" })}
                        id="password"
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && <p className="mt-2 text-red-500 text-xs italic">{errors.password.message?.toString()}</p>}
                </div>
                <div className="flex flex-col items-center justify-between">
                    <Link href="/forgot-password" className="mb-8 text-sm text-gray-500 hover:text-gray-800">
                        Forgot password ?
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Signin
                    </button>
                    <Link href="/signup" className="mt-8 text-sm text-gray-500 hover:text-gray-800">
                        Signup
                    </Link>
                </div>
            </form>
        </div>

    );
};