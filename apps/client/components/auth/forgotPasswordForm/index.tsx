'use client'

import React, { FC, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AuthService } from "@travel-tailor/services";
import { useRouter } from "next/navigation";
import { API_FORGOT_PASSWORD_ROUTE } from "@travel-tailor/constants";

interface IForgotPasswordForm {
    email: string
}

export const ForgotPasswordForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ message?: string }>({});

    const { register, handleSubmit, formState: { errors } } = useForm<IForgotPasswordForm>();
    const router = useRouter();

    const onSubmit = async (data: IForgotPasswordForm) => {
        const response = await AuthService.forgotPassword(`${process.env.NEXT_PUBLIC_API_URL}${API_FORGOT_PASSWORD_ROUTE}`,data, setApiErrors);
        
        if(response) {
            router.push('/signin')
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
                <div className="flex flex-col items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Send Email
                    </button>
                    <Link href="/signin" className="mt-8 text-sm text-gray-500 hover:text-gray-800">
                        Signin
                    </Link>
                </div>
            </form>
        </div>

    );
};