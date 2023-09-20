import { ROUTES } from "@travel-tailor/constants";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="flex flex-col justify-center items-center h-60 bg-gray-800 text-white">
                <Image
          className="h-12 w-auto my-4"
          src="/logo.svg"
          alt="Your Company"
          width={180}
          height={30}
        />
        <p>© {new Date().getFullYear()} Travel Tailor, Inc. All rights reserved.</p>
      <ul className="col-span-4 md:col-span-3 lg:col-span-4 mt-6">
        <li className="my-2">
          <Link href={ROUTES.TERMS_AND_CONDITIONS} className="font-semibold hover:text-cyan-500">Terms And Conditions</Link>
        </li>
      </ul>
    </footer>
  );
};
