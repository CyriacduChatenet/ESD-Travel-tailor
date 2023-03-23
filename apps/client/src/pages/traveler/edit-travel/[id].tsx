import { useProtectedRoute } from "@travel-tailor/hooks";
import { WebUpdateTravelForm } from "@travel-tailor/ui";
import { authUtil } from "@travel-tailor/utils";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "@/layout";

const EditTravel: NextPage = () => {
    const router = useRouter();

    useProtectedRoute(authUtil)
    return (
        <Layout>
            <h1>Edit Travel</h1>
            <WebUpdateTravelForm api_url={`${process.env.NEXT_PUBLIC_API_URL}`} mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`} travel_id={`${router.query.id}`}/>
        </Layout>
    );
}

export default EditTravel;