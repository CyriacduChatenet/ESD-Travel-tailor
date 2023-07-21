/* eslint-disable react-hooks/exhaustive-deps */
import {
  Activity,
  ActivityClosingDay,
  ActivitySchedule,
  ActivityTag,
  Comment,
} from "@travel-tailor/types";
import { useUser } from "@travel-tailor/contexts";
import {
  ActivityClosingDayService,
  ActivityScheduleService,
  ActivityService,
  ActivityTagService,
} from "@travel-tailor/services";
import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { set, useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useParams, usePathname } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";
import { PhotoIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ROUTES } from "@travel-tailor/constants";

interface ICreateActivityForm {
  name: string;
  image: FileList;
  location: string;
  duration: number;
  content: string;
  opening_at: string;
  closing_at: string;
  date: string;
  recurrence: boolean;
  description: string;
}

export const EditActivityForm: FC = () => {
  const DEFAULT_INPUT_TIMER = 5000;

  const [apiErrors, setApiErrors] = useState<{ message?: string }>({});
  const [submit, setSubmit] = useState<boolean>(false);
  const [tags, setTags] = useState<ActivityTag[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [response, setResponse] = useState<Activity>();
  const [openSchedule, setOpenSchedule] = useState("");
  const [closeSchedule, setCloseSchedule] = useState("");
  const [schedules, setSchedules] = useState<ActivitySchedule[]>([]);
  const [closingDayInput, setClosingDayInput] = useState("");
  const [closingDayCheck, setClosingDayCheck] = useState(false);
  const [closingDays, setClosingDays] = useState<ActivityClosingDay[]>([]);
  const [address, setAddress] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateActivityForm>();
  const { user } = useUser();
  const params = usePathname();

  const handleScheduleInputChange = async (schedule: string) => {
    const s = await ActivityScheduleService.createActivitySchedule(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      { opening_at: openSchedule, closing_at: schedule },
      setApiErrors
    );
    if (s) {
      setSchedules([...schedules, s]);
    }
  };

  const handleScheduleDelete = async (id: string, index: number) => {
    await ActivityScheduleService.deleteActivitySchedule(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      id,
      setApiErrors
    );
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  const handleClosingDayInputChange = async (date: string) => {
    const d = new Date(date);
    const closing_d = await ActivityClosingDayService.createActivityClosingDay(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      { date: d, recurrence: closingDayCheck },
      setApiErrors
    );
    if (closing_d) {
      setClosingDays([...closingDays, closing_d]);
    }
  };

  const handleClosingDayDelete = async (id: string, index: number) => {
    await ActivityClosingDayService.deleteActivityClosingDay(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      id,
      setApiErrors
    );
    setClosingDays(closingDays.filter((_, i) => i !== index));
  };

  const handleTagDelete = async (id: string, index: number) => {
    await ActivityTagService.deleteActivityTag(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      id,
      setApiErrors
    );
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagInputChange = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target as HTMLInputElement;
    const tag = await ActivityTagService.createActivityTag(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      { name: value },
      setApiErrors
    );
    if (tag) {
      setTags([...tags, tag]);
    }
  };

  const handleLocationChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setAddress(value);
  };

  const onSubmit = async (data: ICreateActivityForm) => {
    if (user) {
      setSubmit(true);

      const file = data.image[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("detail[location]", data.location);
      formData.append("detail[duration]", data.duration.toString());
      schedules.forEach((schedule: ActivitySchedule, index: number) => {
        formData.append(
          `detail[schedules][${index}][opening_at]`,
          schedule.opening_at
        );
        formData.append(
          `detail[schedules][${index}][closing_at]`,
          schedule.closing_at
        );
      });

      closingDays.forEach((closingDay: ActivityClosingDay, index: number) => {
        formData.append(
          `detail[closingDays][${index}][date]`,
          new Date(closingDay.date).toISOString()
        );
        formData.append(
          `detail[closingDays][${index}][recurrence]`,
          String(closingDay.recurrence)
        );
      });
      formData.append("image", file);
      formData.append("advertiser", String(user?.advertiser?.id));
      tags.forEach((tag: ActivityTag, index: number) => {
        formData.append(`tags[${index}][id]`, tag.id);
        formData.append(`tags[${index}][name]`, tag.name);
      });

      await ActivityService.updateActivityWithRelations(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        params?.substring(26, 100),
        formData,
        tags,
        setApiErrors
      );
    }
  };

  const handleFetch = async () => {
    if (params) {
      await ActivityService.findActivityBySlugWithRelations(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        `${params.substring(26, 100)}`,
        setResponse as Dispatch<SetStateAction<Activity>>,
        setComments,
        setApiErrors
      );
      setValue("name", String(response?.name));
      setValue("description", String(response?.description));
      setValue("location", String(response?.detail?.location));
      setValue("duration", Number(response?.detail?.duration));
      setTags(response?.tags || []);
      setSchedules(response?.detail?.schedules || []);
      setClosingDays(response?.detail?.closingDays || []);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 col-span-4 md:col-span-8 xl:col-span-12 xl:row-span-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Edit activity
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12 xl:mb-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-red-500 text-xs italic">
                      {errors.name.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                      })}
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about activity.
                  </p>
                  {errors.description && (
                    <p className="mt-2 text-red-500 text-xs italic">
                      {errors.description.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            type="file"
                            {...register("image", {
                              required: "Image is required",
                              validate: {
                                validFileType: (value) => {
                                  const allowedTypes = [
                                    "image/jpeg",
                                    "image/png",
                                    "image/jpg",
                                    "image/webp",
                                  ];
                                  const fileType = value[0]?.type;
                                  if (
                                    fileType &&
                                    !allowedTypes.includes(fileType)
                                  ) {
                                    return "File type not supported";
                                  }
                                  return true;
                                },
                              },
                            })}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                  {errors.image && (
                    <p className="mt-2 text-red-500 text-xs italic">
                      {errors.image.message?.toString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Activity Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="location"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      onChange={handleLocationChange}
                      autoComplete="location"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-2 text-red-500 text-xs italic">
                      {errors.location.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Duration in hours
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      {...register("duration", {
                        required: "Duration is required",
                      })}
                      id="duration"
                      autoComplete="duration"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.duration && (
                    <p className="mt-2 text-red-500 text-xs italic">
                      {errors.duration.message?.toString()}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tags
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...register("content", {
                        required: "Tag is required",
                      })}
                      id="tag-content"
                      autoComplete="tag_content"
                      onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                        setTimeout(() => {
                          handleTagInputChange(e);
                        }, 2000);
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {tags.length === 0 && (
                    <p className="mt-2 text-red-500 text-xs italic">
                      {errors.content?.message?.toString()}
                    </p>
                  )}
                  <div>
                    {tags.map((tag: ActivityTag, index: number) => (
                      <div
                        key={index}
                        className="flex justify-around items-center rounded-full bg-cyan-600 text-white my-2"
                      >
                        <p>{tag.name}</p>
                        <button
                          className="text-white font-bold py-2 px-4"
                          onClick={() =>
                            handleTagDelete(`${String(tag.id)}`, index)
                          }
                        >
                          <Icon icon="material-symbols:close-rounded" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="schedules"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Schedules
                  </label>
                  <div className="mt-2 flex">
                    <input
                      type="time"
                      id="schedule_opening_at"
                      {...register("opening_at", {
                        required: "Opening time is required",
                      })}
                      onChange={(e) => setOpenSchedule(e.target.value)}
                      onClick={() => setApiErrors({})}
                      autoComplete="schedule_opening_at"
                      className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                    <input
                      type="time"
                      {...register("closing_at", {
                        required: "Closing time is required",
                      })}
                      id="schedule_closing_at"
                      onClick={() => setApiErrors({})}
                      onChange={(e) => {
                        setCloseSchedule(e.target.value);
                        setTimeout(() => {
                          handleScheduleInputChange(e.target.value);
                        }, DEFAULT_INPUT_TIMER);
                      }}
                      autoComplete="schedule_closing_at"
                      className="block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {schedules.length === 0 && (
                    <p className="mt-2 text-red-500 text-xs italic">
                      {errors.opening_at?.message
                        ? `${errors.opening_at?.message?.toString()} & `
                        : ""}
                      {errors.closing_at?.message?.toString()}
                    </p>
                  )}
                  <div>
                    {schedules.map(
                      (schedule: ActivitySchedule, index: number) => (
                        <div
                          key={index}
                          className="flex justify-around items-center rounded-full bg-cyan-600 text-white my-2"
                        >
                          <p>
                            {schedule.opening_at} - {schedule.closing_at}
                          </p>
                          <button
                            className="text-white font-bold py-2 px-4"
                            onClick={() =>
                              handleScheduleDelete(
                                `${String(schedule.id)}`,
                                index
                              )
                            }
                          >
                            <Icon icon="material-symbols:close-rounded" />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="col-span-full flex">
                  <div className="w-1/4">
                    <label
                      htmlFor="reccurence"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Reccurence
                    </label>
                    <div className="mt-2 flex items-center h-1/3">
                      <input
                        {...register("recurrence", {
                          required: false,
                        })}
                        id="closing_day_recurrence"
                        type="checkbox"
                        onClick={() => setApiErrors({})}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setClosingDayCheck(e.target.checked)
                        }
                      />
                    </div>
                  </div>
                  <div className="w-3/4">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date
                    </label>
                    <div className="mt-2">
                      <input
                        {...register("date", {
                          required: "Date is required",
                        })}
                        id="closing_day_date"
                        type="date"
                        onClick={() => setApiErrors({})}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setClosingDayInput(e.target.value);
                          setTimeout(() => {
                            handleClosingDayInputChange(e.target.value);
                          }, DEFAULT_INPUT_TIMER);
                        }}
                        autoComplete="date"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                      />
                      {closingDays.length === 0 && (
                        <p className="mt-2 text-red-500 text-xs italic">
                          {errors.recurrence?.message
                            ? `${errors.recurrence?.message?.toString()} & `
                            : ""}
                          {errors.date?.message?.toString()}
                        </p>
                      )}
                      <div>
                        {closingDays.map(
                          (closingDay: ActivityClosingDay, index: number) => (
                            <div
                              key={index}
                              className="flex justify-around items-center rounded-full bg-cyan-600 text-white my-2"
                            >
                              <p>
                                {new Date(closingDay.date).toLocaleDateString(
                                  "fr"
                                )}{" "}
                                - recurrence:{" "}
                                {closingDay.recurrence ? "true" : "false"}
                              </p>
                              <button
                                className="text-white font-bold py-2 px-4"
                                onClick={() =>
                                  handleClosingDayDelete(
                                    `${String(closingDay.id)}`,
                                    index
                                  )
                                }
                              >
                                <Icon icon="material-symbols:close-rounded" />
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link href={ROUTES.ADVERTISER.DASHBOARD}>
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              {submit ? (
                <Player
                  src="https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json"
                  className="w-5 h-5"
                  loop
                  autoplay
                />
              ) : (
                <>Edit Activity</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
