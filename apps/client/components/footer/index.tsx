import { ROUTES } from "@travel-tailor/constants";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
    return (
        <footer className="md:grid md:grid-cols-8 xl:grid-cols-12 flex flex-col-reverse justify-around px-10 py-8 bg-blue-500 text-white">
            <div className="col-span-4 md:col-span-3 lg:col-span-4 flex justify-center lg:justify-around md:items-center">
                <p className="hidden xl:visible">Travel Tailor</p>
                <p>© {new Date().getFullYear()} Travel Tailor, Inc</p>
            </div>
            <ul className="col-span-4 md:col-span-3 lg:col-span-4 flex flex-col lg:flex-row items-center lg:justify-around my-8 md:my-0">
                {/* <li className="my-2">
                    <Link href={ROUTES.SITE_MAP}>Site map</Link>
                </li> */}
                <li className="my-2">
                    <Link href={ROUTES.TERMS_AND_CONDITIONS}>Terms And Conditions</Link>
                </li>
                {/* <li className="my-2">
                    <Link href={ROUTES.ABOUT_US}>About project</Link>
                </li> */}
            </ul>
            {/* <div className="col-span-4 md:col-span-2 lg:col-span-4 flex justify-center items-center">
                <Link href={''}>
                    <button>
                        <Icon icon="mdi:chevron-up" className="w-10 h-10" />
                    </button>
                </Link>
            </div> */}
        </footer>
    );
};