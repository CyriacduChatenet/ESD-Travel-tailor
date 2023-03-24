import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Layout } from "@/layout";
import { ActivityService } from "@travel-tailor/services";
import { Activity } from "@travel-tailor/types";
import Link from "next/link";
import { ROUTES } from "@travel-tailor/constants";

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
                    {data.map((activity: Activity, index) => <Link href={`${ROUTES.ADVERTISER.ACTIVITY.LIST}/${activity.slug}`} key={index}>
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