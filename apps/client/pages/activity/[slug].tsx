import { NextPage } from "next";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Activity } from "@travel-tailor/types";
import { ActivityService } from "@travel-tailor/services";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { ActivityModule } from "@/components/traveler/travels/activity/module";
import { CommentModule } from "@/components/traveler/travels/activity/comments/module";
const Mapbox: any = dynamic(() => import('@/components/map').then((mode) => mode.Mapbox), { loading: () => <div className="h-96 w-full" />, ssr: false })

const ActivityPage: NextPage = () => {
    const [apiError, setApiError] = useState({});
    const [data, setData] = useState<Activity>();
    const [displayCommentModule, setDisplayCommentModule] = useState(false);

    const params = usePathname();

    const handleFetch = async () => {
        const response = await ActivityService.findActivityBySlug(`${process.env.NEXT_PUBLIC_API_URL}`, params.substr(10, 100), setApiError);
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
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        {data ? <>
                            <h1 className="font-bold lg:text-2xl xl:mb-8">{data.name}</h1>
                            <div className={`w-full h-72 bg-[url('https://images.unsplash.com/photo-1493564738392-d148cfbd6eda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')] bg-cover bg-center`}></div>
                            {displayCommentModule ? <CommentModule setDisplayCommentModule={setDisplayCommentModule} comments={data.comments} data={data} setData={setData as Dispatch<SetStateAction<Activity>>} /> : <ActivityModule location={data.detail.location} duration={data.detail.duration} mark={data.mark} commentsIndex={data.comments.length} programmingAt={new Date()} setDisplayCommentModule={setDisplayCommentModule} date={new Date()} />}
                        </> : <p>Loading...</p>}
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
}

export default ActivityPage;