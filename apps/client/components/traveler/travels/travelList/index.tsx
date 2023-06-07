import Link from "next/link";
import React, { FC, useMemo, useState } from "react";
import { TravelService } from "@travel-tailor/services";
import { Travel, User } from "@travel-tailor/types";
import { ROUTES } from "@travel-tailor/constants";
import { Icon } from "@iconify/react";

import { Paginator } from "@/components/paginator";
import { Player } from "@lottiefiles/react-lottie-player";

interface IProps {
  data: {
    page: number;
    limit: number;
    total: number;
    data: Travel[];
  };
  user: User;
}

export const TravelList: FC<IProps> = ({ data, user }) => {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState<{
    page: number;
    limit: number;
    total: number;
    data: Travel[];
  }>(data);
  const error = {};

  const handleFetch = async () => {
    const res = await TravelService.findTravelsByTravelerId(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      String(user?.traveler?.id),
      error,
      page
    );
    if (res) setResponse(res);
  };

  const handleDelete = async (id: string) => {
    await TravelService.deleteTravel(`${process.env.NEXT_PUBLIC_API_URL}`, id, error)
    await handleFetch();
  };

  useMemo(() => {
    handleFetch();
  }, [page, user]);

  return (
    <>
      <h2 className="font-bold text-2xl">My Travels</h2>
      <ul>
        {response.data ? (
          response.data.map((travel: Travel, index: number) => (
            <li
              key={index}
              className="px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:grid xl:grid-cols-12 xl:gap-5 lg:pr-20"
            >
              <p className="lg:col-span-4">{travel.destinationCity}</p>
              <p className="lg:col-span-3">
                {`${new Date(travel.departureDate).toLocaleDateString("fr")}`} -{" "}
                {`${new Date(travel.returnDate).toLocaleDateString("fr")}`}
              </p>
              <div className="lg:col-span-3">
                {!travel.validate && (
                  <span className="text-red-500 bg-red-100 py-2 px-6 rounded-full">
                    Not validated
                  </span>
                )}
                {travel.validate && (
                  <span className="text-green-500 bg-green-100 py-2 px-6 rounded-full">
                    Validated
                  </span>
                )}
              </div>
              <div className="lg:col-span-1" onClick={() => handleDelete(travel.id)}>
                <Icon icon="mdi:trash" className="w-6 h-6" />
              </div>
              <div className="lg:col-span-1">
                <Link
                  href={`${ROUTES.TRAVELER.TRAVELER}${ROUTES.TRAVELER.TRAVEL.FIND}/${travel.id}`}
                >
                  <Icon
                    icon="material-symbols:chevron-right"
                    className="w-6 h-6"
                  />
                </Link>
              </div>
            </li>
          ))
        ) : (
          <Player
            src="https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json"
            className="w-12 h-12"
            loop
            autoplay
          />
        )}
      </ul>
      <Paginator
        pageCurrent={page}
        setPage={setPage}
        limit={data?.limit}
        total={data?.total}
      />
    </>
  );
};
