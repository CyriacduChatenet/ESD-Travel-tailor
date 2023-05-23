import React, { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AuthService, TravelerService, UserService } from "@travel-tailor/services";
import { API_SIGNUP_ROUTE, ROLES, ROUTES } from "@travel-tailor/constants";
import { User } from "@travel-tailor/types";
import { Player } from "@lottiefiles/react-lottie-player";

interface ISignupForm {
    username: string
    email: string
    password: string
    roles: string
    acceptTerms: boolean
}

export const SignupForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<Error>({
        cause: "",
        name: "",
        message: "",
    });
    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ISignupForm>();
    const router = useRouter()

    const handleRedirect = async (user: User, data: ISignupForm) => {
        if (data.roles === ROLES.TRAVELER) {
          const traveler = await TravelerService.createTraveler(`${process.env.NEXT_PUBLIC_API_URL}`, {
            user: user.id,
            name: user.username,
            email: user.email,
          }, setApiErrors)
          await UserService.updateUser(`${process.env.NEXT_PUBLIC_API_URL}`, await user.id, { traveler: traveler.id }, setApiErrors)
          router.push(`${ROUTES.TRAVELER.TASTE.CREATE}/${traveler.id}`)
        }
    
        if (data.roles === ROLES.ADVERTISER) {
          router.push(`${ROUTES.ADVERTISER.CREATE_ADVERTISER}/${user.id}`)
        }
    
        if (data.roles === ROLES.ADMIN) {
          router.push(ROUTES.AUTH.SIGNIN)
        }
      }    

    const onSubmit = async (data: ISignupForm) => {
        const response = await AuthService.signup(`${process.env.NEXT_PUBLIC_API_URL}${API_SIGNUP_ROUTE}`, data, setApiErrors);
        if(response) {
            const user = await UserService.getUserInfo(`${process.env.NEXT_PUBLIC_API_URL}`, setApiErrors) as User;
            await handleRedirect(user, data)
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
            {apiErrors.message.length > 0 && <p className="mb-2 text-red-500 text-xs italic">User is already exist</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                        Username
                    </label>
                    <input
                        {...register("username", {
                            required: "Username is required",
                        })}
                        id="username"
                        type="text"
                        onClick={() => setApiErrors({ message: "", name: "", cause: ""})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.username && <p className="mt-2 text-red-500 text-xs italic">{errors.username?.message?.toString()}</p>}
                </div>
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
                        onClick={() => setApiErrors({ message: "", name: "", cause: ""})}
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
                        onClick={() => setApiErrors({ message: "", name: "", cause: ""})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && <p className="mt-2 text-red-500 text-xs italic">{errors.password.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
                        Role
                    </label>
                    <select
                        {...register("roles", { required: "Role is required" })}
                        id="role"
                        onClick={() => setApiErrors({ message: "", name: "", cause: ""})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Select role</option>
                        <option value="traveler">Traveler</option>
                        <option value="advertiser">Advertiser</option>
                    </select>
                    {errors.roles && <p className="text-red-500 text-xs italic">{errors.roles?.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            {...register("acceptTerms", { required: "You must be accept general conditions" })}
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700 font-medium">
                            I consent to the processing of my personal data in accordance with the{" "}
                            <Link href="#" className="text-blue-500">
                                general conditions
                            </Link>
                        </span>
                    </label>
                    {errors.acceptTerms && (
                        <p className="text-red-500 text-xs italic">{errors.acceptTerms.message}</p>
                    )}
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
                    /> : <>Signup</>}
                    </button>
                    <Link href="/signin" className="mt-8 text-sm text-gray-500 hover:text-gray-800">
                        Signin
                    </Link>
                </div>
            </form>
        </div>
    );
};