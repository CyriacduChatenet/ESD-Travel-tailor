import { NextPage } from "next";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import Link from "next/link";
import { ROUTES } from "@travel-tailor/constants";
import { EditActivityForm } from "@/components/traveler/travels/EditActivityForm";

const EditTravelActivityPage: NextPage = () => {
  return (
    <AuthChecker>
      <Layout
        title={
          "Create Your Dream Journey with Personalized Activities | Travel Tailor"
        }
        description={
          "Plan your perfect trip with our personalized travel planner. Explore a wide range of activities and create a customized itinerary tailored to your preferences. Discover new destinations, indulge in exciting adventures, and make lasting memories on your unique journey. Start planning today!"
        }
      >
        <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
          <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
          <div className="col-span-4 md:col-span-8 xl:col-span-12 flex items-center justify-around">
                        <Link href={ROUTES.ADVERTISER.DASHBOARD}>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Return
                            </button>
                        </Link>
                        <h1 className="text-2xl font-bold">Travel edit activity</h1>
                        <EditActivityForm />
                    </div>
          </section>
        </main>
      </Layout>
    </AuthChecker>
  );
};

export default EditTravelActivityPage;