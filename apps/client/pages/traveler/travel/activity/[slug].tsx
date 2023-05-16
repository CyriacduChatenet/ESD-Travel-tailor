import { NextPage } from "next";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Activity } from "@travel-tailor/types";
import { ActivityService } from "@travel-tailor/services";
import Image from "next/image";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { ActivityModule } from "@/components/traveler/travels/activity/module";
import { CommentModule } from "@/components/traveler/travels/activity/comments/module";
const Mapbox: any = dynamic(() => import('@/components/map').then((mode) => mode.Mapbox), { loading: () => <div className="h-96 w-full" />, ssr: false })

const TravelActivityPage: NextPage = () => {
    const [apiError, setApiError] = useState({});
    const [data, setData] = useState<Activity>();
    const [displayCommentModule, setDisplayCommentModule] = useState(false);

    const params = usePathname();

    const handleFetch = async () => {
        const response = await ActivityService.findActivityBySlug(`${process.env.NEXT_PUBLIC_API_URL}`, params.substring(26, 100), setApiError);
        if (response) {
            setData(response);
            return response;
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <AuthChecker>
            <Layout>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        {data ? <>
                            <h1 className="font-bold lg:text-2xl">{data.name}</h1>
                            <Image src={""} alt={"Banner"} />
                            {displayCommentModule ? <CommentModule setDisplayCommentModule={setDisplayCommentModule} /> : <ActivityModule location={data.detail.location} duration={data.detail.duration} mark={data.mark} commentsIndex={data.comments.length} programmingAt={new Date()} setDisplayCommentModule={setDisplayCommentModule} date={new Date()} />}
                        </> : <p>Loading...</p>}
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
}

export default TravelActivityPage;