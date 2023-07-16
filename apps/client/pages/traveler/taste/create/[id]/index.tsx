import { NextPage } from "next";

import { CreateTasteForm } from "@/components/traveler/tastes/createTasteForm";
import { Layout } from "@/components/layout";

const CreateTastePage: NextPage = () => {
    return (
        <Layout title={"Create Your Customized Travel Experience - Tailor-Made Adventures | Travel Tailor"} description={"Craft your perfect travel journey with our user-friendly travel manager. Personalize your trip itinerary based on your unique preferences and interests. Explore exciting activities and create unforgettable memories. Start creating your tailor-made adventure now!"}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 xl:row-span-12 pt-20">
                <div className="xl:row-span-6"></div>
                <h1 className="font-bold lg:text-2xl col-span-4 lg:col-span-8 xl:col-span-12 xl:row-span-1 text-center">Create Tastes</h1>
                <CreateTasteForm />
            </main>
        </Layout>
    );
}

export default CreateTastePage;