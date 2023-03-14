import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Layout } from "@/layout";
import { ActivityService } from "@travel-tailor/services";
import { Activity } from "@travel-tailor/types";
import Link from "next/link";

const ActivityListPage: NextPage = () => {
    const [data, setData] = useState<Activity[]>([]);

    const handleFetch = async () => {
        const activities = await ActivityService.findAllActivities(`${process.env.NEXT_PUBLIC_API_URL}`);
        return setData(activities);
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <Layout>
            <div>
                <h1>Activities</h1>
                <section>
                    {data.map((activity: Activity, index) => <Link href={`/activity/${activity.slug}`} key={index}>
                        <div>
                            <p>{activity.name}</p>
                        </div>
                    </Link>)}
                </section>
            </div>
        </Layout>
    );
};

export default ActivityListPage;