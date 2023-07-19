/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { loadStripe } from "@stripe/stripe-js";
import { usePayment } from "@travel-tailor/hooks";
import { jwtDecode } from "@travel-tailor/functions";
import { AccessToken, User } from "@travel-tailor/types";
import { UserService } from "@travel-tailor/services";
import { parse } from "cookie";
import { CheckIcon } from '@heroicons/react/20/solid'

import { Layout } from "@/components/layout";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

interface IProps {
  stripeCustomerId: string;
}

const includedFeatures = [
  "Unlimited activity postings",
  "Member resources",
  "Link to your website",
  "Link to your social media",
];

const AdvertiserPaymentPage: NextPage<IProps> = ({ stripeCustomerId }) => {
  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
  );

  const [apiErrors, setApiErrors] = useState<{ status?: number }>({});

  const handlePayed = async () => {
    usePayment(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      stripeCustomerId,
      stripePromise,
      { location: `Bordeaux, Gironde, France`, amount: 10000 },
      setApiErrors
    );
  };
  
  const pathname = usePathname();
  Cookies.set("redirectPayment", pathname);

  return (
    <Layout title={""} description={""}>
      <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
        <div className="bg-white py-24 sm:py-32 col-span-4 lg:col-span-8 xl:col-span-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our plans
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Create advertiser account to create and manage your activities, reservations and customers.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  Advertiser plan
                </h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  Buy advertiser plan to get access to all the features of the platform.
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                    What’s included
                  </h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">
                      Subscription
                    </p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        100€
                      </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                        / month
                      </span>
                    </p>
                    <button
                    onClick={handlePayed}
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get access
                    </button>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      Invoices and receipts available for easy company
                      reimbursement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AdvertiserPaymentPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie;
  const parsedCookies = cookies ? parse(cookies) : {};
  const accessToken = parsedCookies.signinToken;
  const decodedToken = jwtDecode(accessToken) as AccessToken;

  let user = {} as User;
  let stripeCustomerId = "";
  let error = {};

  if (accessToken) {
    user = await UserService.getUserByToken(
      `${process.env.API_URL}`,
      decodedToken.email,
      error
    );
    stripeCustomerId = user.customer.stripeId;
  }

  return {
    props: {
      stripeCustomerId,
    },
  };
};
