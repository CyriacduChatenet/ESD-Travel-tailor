'use client'

import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthService } from "@travel-tailor/services";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@travel-tailor/constants";

interface IResetPasswordForm {
    password: string
}

export const ResetPasswordForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ message?: string }>({});

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
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Password
                    </label>
                    <input
                        {...register("password", { required: "Password is required" })}
                        id="password"
                        type="password"
                        onClick={() => setApiErrors({})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && <p className="mt-2 text-red-500 text-xs italic">{errors.password.message?.toString()}</p>}
                </div>
                <div className="flex flex-col items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </div>

    );
};