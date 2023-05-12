'use client'

import { ROUTES } from "@/../../packages/constants/src";
import { TokenService } from "@/../../packages/services/src";
import Link from "next/link";
import { FC } from "react";

export const Navbar: FC = () => {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link href={'/'}>
                    <span className="font-semibold text-xl tracking-tight">Travel Tailor</span>
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>Menu</title>
                        <path
                            fillRule="evenodd"
                            d="M2 5h16a1 1 0 010 2H2a1 1 0 010-2zm0 6h16a1 1 0 010 2H2a1 1 0 010-2zm0
                            6h16a1 1 0 010 2H2a1 1 0 010-2z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow"></div>
                <div>
                    {TokenService.getAccessToken() === null ? <>
                        <Link
                            href={ROUTES.AUTH.SIGNIN}
                            className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                        >
                            Signin
                        </Link>
                        <Link
                            href={ROUTES.AUTH.SIGNUP}
                            className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                        >
                            Signup
                        </Link>
                    </> : null}
                    {
                        TokenService.getAccessToken() !== null ? <>
                            <Link
                                href={ROUTES.ROOT}
                                className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
                                onClick={() => TokenService.removeAccessToken()}
                            >
                                Logout
                            </Link>
                        </> : null
                    }
                </div>
            </div>
        </nav>
    );
}