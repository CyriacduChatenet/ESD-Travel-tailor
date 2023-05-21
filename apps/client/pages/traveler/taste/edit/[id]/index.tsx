import { NextPage } from "next";

import { Layout } from "@/components/layout";
import { EditTasteForm } from "@/components/traveler/tastes/editTasteForm";

const CreateTastePage: NextPage = () => {
    return (
        <Layout title={"Create Your Customized Travel Experience - Tailor-Made Adventures | Travel Tailor"} description={"Craft your perfect travel journey with our user-friendly travel manager. Personalize your trip itinerary based on your unique preferences and interests. Explore exciting activities and create unforgettable memories. Start creating your tailor-made adventure now!"}>
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                <h1>Edit Taste Page</h1>
                <EditTasteForm />
            </main>
        </Layout>
    );
}

export default CreateTastePage;