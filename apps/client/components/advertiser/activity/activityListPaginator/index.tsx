import Link from "next/link";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { ActivityService } from "@travel-tailor/services";
import { Activity, User } from "@travel-tailor/types";
import { ROUTES } from "@travel-tailor/constants";
import { Icon } from "@iconify/react";

import { Player } from "@lottiefiles/react-lottie-player";

interface IProps {
  editorMode: boolean;
  user: User;
  data: { page: number; limit: number; total: number; data: Activity[] };
  setData: Dispatch<
    SetStateAction<{
      page: number;
      limit: number;
      total: number;
      data: Activity[];
    }>
  >;
}

export const ActivityListPaginator: FC<IProps> = ({
  editorMode,
  user,
  data,
  setData,
}) => {
  const [apiError, setApiError] = useState({});

  const handleDelete = async (id: string) => {
    if (user) {
      const res = await ActivityService.deleteActivity(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        id,
        setApiError
      );
      if (res) {
        setData({
          ...data,
          data: data.data.filter((activity: Activity) => activity.id !== id),
        });
      }
    }
  };

  return (
    <nav>
      <ul>
        {data.data ? (
          data.data.map((activity: Activity, index: number) => (
            <li
              key={index}
              className="px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:grid xl:grid-cols-12 xl:gap-5 lg:pr-20"
            >
              <p className="lg:col-span-5">{activity.name}</p>
              <p className="lg:col-span-5">{activity.detail.location}</p>
              <div className="lg:col-span-2">
                {editorMode ? (
                  <div className={"flex"}>
                    <Link
                      href={`${ROUTES.ADVERTISER.ACTIVITY.UPDATE_ACTIVITY}/${activity.slug}`}
                      aria-label={`View activity ${activity.name}`}
                    >
                      <button aria-label={`Edit activity ${activity.name}`}>
                        <Icon
                          icon="akar-icons:edit"
                          className="w-6 h-6 mr-12"
                        />
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(activity.id)}    aria-label={`Delete activity ${activity.name}`}>
                      <Icon
                        icon="material-symbols:delete"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                ) : (
                  <Link href={`${ROUTES.ACTIVITY.INDEX}/${activity.slug}`}>
                    <Icon
                      icon="material-symbols:chevron-right"
                      className="w-6 h-6"
                    />
                  </Link>
                )}
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
    </nav>
  );
};
