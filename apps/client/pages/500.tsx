import { NextPage } from "next";
import Link from "next/link";
import { ROUTES } from "@travel-tailor/constants";

import { Layout } from "@/components/layout";

const ServerErrorPage: NextPage = () => {
  return (
    <Layout title={""} description={""}>
      <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-10">
        <div className="text-center col-span-4 md:col-span-8 xl:col-span-12 w-full h-full flex flex-col justify-center items-center">
          <p className="text-base font-semibold text-cyan-600">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Internal Server Error
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={ROUTES.ROOT}
              className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ServerErrorPage;
