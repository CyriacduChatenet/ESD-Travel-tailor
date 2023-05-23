import { AccessToken, User } from "@travel-tailor/types";
import { ROLES, ROUTES } from "@travel-tailor/constants";
import { TokenService } from "@travel-tailor/services";
import { FC } from "react";
import Link from "next/link";

interface IProps {
    accessToken: string;
    role: string;
}

export const NavModule: FC<IProps> = ({ accessToken, role }) => {
    return (
        <>
            {accessToken && role === ROLES.ADVERTISER && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.ADVERTISER.DASHBOARD}>Dashboard</Link>
                </li>
            )}
            {accessToken && role === ROLES.TRAVELER && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.TRAVELER.DASHBOARD}>Dashboard</Link>
                </li>
            )}
            {accessToken && role === ROLES.TRAVELER && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.TRAVELER.TASTE.INDEX}>Tastes</Link>
                </li>
            )}
            {accessToken && role === ROLES.ADVERTISER && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.ADVERTISER.INVOICE.INDEX}>Invoices</Link>
                </li>
            )}
            {accessToken && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.SETTINGS}>Settings</Link>
                </li>
            )}
            {accessToken && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.ROOT} onClick={() => TokenService.removeAccessToken()}>
                        Logout
                    </Link>
                </li>
            )}
            {!accessToken && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.AUTH.SIGNIN}>Signin</Link>
                </li>
            )}
            {!accessToken && (
                <li className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                    <Link href={ROUTES.AUTH.SIGNUP}>Signup</Link>
                </li>
            )}
        </>
    );
};