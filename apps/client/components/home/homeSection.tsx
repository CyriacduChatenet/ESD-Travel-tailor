import { FC } from "react";

interface IProps {
  title: string;
  description: string;
  image: string;
}

export const HomeSection: FC<IProps> = ({ title, description, image }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pb-30 pt-16 sm:pb-30 sm:pt-20 lg:pb-45 lg:pt-36">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-xl text-gray-500">
                {description}
            </p>
          </div>
          <div>
            <div className="mt-10">
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid flex-shrink-0 gap-y-6 lg:gap-y-8">
                      <div className="h-full w-full overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
