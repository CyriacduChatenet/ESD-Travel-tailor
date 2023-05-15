import { NextPage } from "next";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Activity } from "@travel-tailor/types";
import { ActivityService } from "@travel-tailor/services";

import { AuthChecker } from "@/components/auth/authChecker";
import Image from "next/image";
import Link from "next/link";
const Mapbox: any = dynamic(() => import('@/components/map').then((mode) => mode.Mapbox), { loading: () => <div className="h-96 w-full" />, ssr: false })

const TravelActivityPage: NextPage = () => {
    const [apiError, setApiError] = useState({});
    const [data, setData] = useState<Activity>();
    const [day, setDay] = useState<Date>(new Date());

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
            <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                    {data ? <>
                        <h1 className="font-bold lg:text-2xl">{data.name}</h1>
                        <Image src={""} alt={"Banner"} />
                        <p>tool bar</p>
                        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
                            <div className="col-span-4 md:col-span-4 xl:col-span-8">
                                <p>description</p>
                                <div className="py-4 lg:py-8 w-full flex justify-around items-center">
                                    <Link href={''}>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Return</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-span-4 md:col-span-4 xl:col-span-4 hidden md:block">
                                <Mapbox
                                    mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`}
                                    addresse={`Bordeaux, Gironde, France`}
                                />
                            </div>
                        </section>
                    </> : <p>Loading...</p>}
                </section>
            </main>
        </AuthChecker>
    );
}

export default TravelActivityPage;