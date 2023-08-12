import { NextPage } from "next";
import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@travel-tailor/constants";
import Cookies from "js-cookie";

import { Layout } from "@/components/layout";

const PaymentSuccessPage: NextPage = () => {
  useEffect(() => {
    Cookies.remove("redirectPayment");
  }, []);
  return (
    <Layout title={""} description={""}>
      <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20 place-items-center bg-white py-24 sm:py-32">
        <div className="text-center col-span-4 md:col-span-8 xl:col-span-12">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Payment accepted
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Your subscription is already active.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={ROUTES.ROOT}
              className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PaymentSuccessPage;
