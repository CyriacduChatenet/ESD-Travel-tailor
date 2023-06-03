import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Activity, AccessToken, User } from "@travel-tailor/types";
import { ActivityService, UserService } from "@travel-tailor/services";
import { parse } from "cookie";
import { jwtDecode } from "@travel-tailor/functions";

import { AuthChecker } from "@/components/auth/authChecker";
import { Layout } from "@/components/layout";
import { ActivityModule } from "@/components/traveler/travels/activity/module";
import { CommentModule } from "@/components/traveler/travels/activity/comments/module";

interface IProps {
  activity: Activity;
  user: User;
}

const ActivityPage: NextPage<IProps> = ({ activity, user }) => {
  const [data, setData] = useState<Activity | null>(activity);
  const [displayCommentModule, setDisplayCommentModule] = useState(false);

  return (
    <AuthChecker>
      <Layout
        title={"Create Your Dream Vacation with Personalized Activities"}
        description={"Discover the ultimate travel planner that lets you curate your ideal journey filled with activities tailored to your preferences. Explore a variety of destinations and create a unique vacation experience like never before. Start planning now!"}
      >
        <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
          <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
            {data ? (
              <>
                <h1 className="font-bold lg:text-2xl xl:mb-8">{data.name}</h1>
                <div className="w-full h-72 relative">
                  <Image
                    src={activity.image.uploadFile?.Location ?? ""}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </div>
                {displayCommentModule ? (
                  <CommentModule
                    setDisplayCommentModule={setDisplayCommentModule}
                    comments={data.comments}
                    data={data}
                    setData={setData as Dispatch<SetStateAction<Activity>>}
                    user={user}
                  />
                ) : (
                  <ActivityModule
                    location={data.detail.location}
                    duration={data.detail.duration}
                    mark={Number(data?.marks?.global && data?.marks?.global)}
                    commentsIndex={data.comments.length}
                    programmingAt={new Date()}
                    setDisplayCommentModule={setDisplayCommentModule}
                    date={new Date()}
                  />
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </section>
        </main>
      </Layout>
    </AuthChecker>
  );
};

export default ActivityPage;

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const error = {};

  const cookies = req.headers.cookie;
  const parsedCookies = cookies ? parse(cookies) : {};
  const accessToken = parsedCookies.accessToken;
  const decodedToken = jwtDecode(accessToken) as AccessToken;
  let user: User | null = null;

  if (accessToken) {
    user = await UserService.getUserByToken(`${process.env.API_URL}`, decodedToken.email, error);
  }

  const activity = await ActivityService.findActivityBySlug(`${process.env.API_URL}`, String(params?.slug), error);

  return {
    props: {
      activity,
      user
    }
  };
};
