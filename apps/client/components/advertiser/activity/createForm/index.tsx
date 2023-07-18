import {
  ActivityClosingDay,
  ActivitySchedule,
  ActivityTag,
  User,
} from "@travel-tailor/types";
import {
  ActivityClosingDayService,
  ActivityScheduleService,
  ActivityService,
  ActivityTagService,
  UserService,
} from "@travel-tailor/services";
import { ROUTES } from "@travel-tailor/constants";
import { convertDate } from "@travel-tailor/utils";
import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Player } from "@lottiefiles/react-lottie-player";

import { Autocomplete } from "@/components/autocomplete";
import Cookies from "js-cookie";

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

export const CreateActivityForm: FC = () => {
  const DEFAULT_INPUT_TIMER = 5000;

  const [apiErrors, setApiErrors] = useState<{ message?: string }>({});
  const [submit, setSubmit] = useState<boolean>(false);
  const [tags, setTags] = useState<ActivityTag[]>([]);
  const [openSchedule, setOpenSchedule] = useState("");
  const [closeSchedule, setCloseSchedule] = useState("");
  const [schedules, setSchedules] = useState<ActivitySchedule[]>([]);
  const [closingDayInput, setClosingDayInput] = useState("");
  const [closingDayCheck, setClosingDayCheck] = useState(false);
  const [closingDays, setClosingDays] = useState<ActivityClosingDay[]>([]);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState<User | any>({});

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateActivityForm>();
  const router = useRouter();

  const handleFetchUser = async () => {
    const u = await UserService.getUserByToken(`${process.env.NEXT_PUBLIC_API_URL}`, `${Cookies.get('userEmail')}`, {})
    if (u) {
      setUser(u);
    }
  };

  const handleScheduleInputChange = async () => {
    const s = await ActivityScheduleService.createActivitySchedule(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      { opening_at: openSchedule, closing_at: closeSchedule },
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

  const handleClosingDayInputChange = async () => {
    const closing_d = await ActivityClosingDayService.createActivityClosingDay(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      { date: convertDate(closingDayInput), recurrence: closingDayCheck },
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

      const activity = await ActivityService.createActivityWithRelations(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        formData,
        tags,
        setApiErrors
      );

      if (activity) {
        router.push(ROUTES.ADVERTISER.DASHBOARD);
      }
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);
  return (
    <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12 xl:mb-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
            })}
            id="name"
            type="text"
            onClick={() => setApiErrors({})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.name && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.name.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="Description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            name="description"
            id="description"
            cols={30}
            rows={10}
            onClick={() => setApiErrors({})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
          {errors.description && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="Image" className="block text-gray-700 font-bold mb-2">
            Image
          </label>
          <input
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
                  if (fileType && !allowedTypes.includes(fileType)) {
                    return "File type not supported";
                  }
                  return true;
                },
              },
            })}
            id="Image"
            type="file"
            onClick={() => setApiErrors({})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.image && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.image.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>
          <input
            {...register("location", {
              required: "Location is required",
            })}
            id="location"
            type="text"
            onClick={() => setApiErrors({})}
            onChange={handleLocationChange}
            className={`shadow appearance-none border-t ${
              address.length === 0 ? "border-r border-l" : ""
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.location ? "border-red-500" : ""
            }`}
          />
          <Autocomplete address={address} setAddress={setAddress} />
          {errors.location && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.location.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="Duration"
            className="block text-gray-700 font-bold mb-2"
          >
            Duration
          </label>
          <input
            {...register("duration", {
              required: "Duration is required",
            })}
            id="duration"
            type="number"
            onClick={() => setApiErrors({})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.duration && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.duration.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="Tags" className="block text-gray-700 font-bold mb-2">
            Tags
          </label>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div>
              {tags.map((tag: ActivityTag, index: number) => (
                <div
                  key={index}
                  className="flex justify-around items-center rounded-full bg-blue-500 text-white my-2"
                >
                  <p>{tag.name}</p>
                  <button
                    className="text-white font-bold py-2 px-4"
                    onClick={() => handleTagDelete(`${String(tag.id)}`, index)}
                  >
                    <Icon icon="material-symbols:close-rounded" />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <input
                {...register("content", {
                  required: "Tag is required",
                })}
                id="tag_content"
                type="text"
                onClick={() => setApiErrors({})}
                onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                  setTimeout(() => {
                    handleTagInputChange(e);
                  }, 2000);
                }}
              />
            </div>
          </div>
          {tags.length === 0 && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.content?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="Schedules"
            className="block text-gray-700 font-bold mb-2"
          >
            Schedules
          </label>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div>
              {schedules.map((schedule: ActivitySchedule, index: number) => (
                <div
                  key={index}
                  className="flex justify-around items-center rounded-full bg-blue-500 text-white my-2"
                >
                  <p>
                    {schedule.opening_at} - {schedule.closing_at}
                  </p>
                  <button
                    className="text-white font-bold py-2 px-4"
                    onClick={() =>
                      handleScheduleDelete(`${String(schedule.id)}`, index)
                    }
                  >
                    <Icon icon="material-symbols:close-rounded" />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <input
                {...register("opening_at", {
                  required: "Opening time is required",
                })}
                id="schedule_opening_at"
                type="time"
                onClick={() => setApiErrors({})}
                onChange={(e) => setOpenSchedule(e.target.value)}
              />
              <input
                {...register("closing_at", {
                  required: "Closing time is required",
                })}
                id="schedule_closing_at"
                type="time"
                onClick={() => setApiErrors({})}
                onChange={(e) => setCloseSchedule(e.target.value)}
                onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                  setTimeout(() => {
                    handleScheduleInputChange();
                  }, DEFAULT_INPUT_TIMER);
                }}
              />
            </div>
          </div>
          {schedules.length === 0 && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.opening_at?.message ? `${errors.opening_at?.message?.toString()} & ` : ""}
              {errors.closing_at?.message?.toString()}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="Closing_Days"
            className="block text-gray-700 font-bold mb-2"
          >
            Closing days
          </label>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div>
              {closingDays.map(
                (closingDay: ActivityClosingDay, index: number) => (
                  <div
                    key={index}
                    className="flex justify-around items-center rounded-full bg-blue-500 text-white my-2"
                  >
                    <p>
                      {new Date(closingDay.date).toLocaleDateString("fr")} -
                      recurrence: {closingDay.recurrence ? "true" : "false"}
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
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center w-5/12">
                <p>Recurrence</p>
                <input
                  {...register("recurrence", {
                    required: "Recurrence is required",
                  })}
                  id="closing_day_recurrence"
                  type="checkbox"
                  onClick={() => setApiErrors({})}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setClosingDayCheck(e.target.checked)
                  }
                />
              </div>
              <div className="flex justify-between items-center w-6/12">
                <p>Date</p>
                <input
                  {...register("date", {
                    required: "Date is required",
                  })}
                  id="closing_day_date"
                  type="date"
                  onClick={() => setApiErrors({})}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setClosingDayInput(e.target.value)
                  }
                  onKeyUp={() => {
                    setTimeout(() => {
                      handleClosingDayInputChange();
                    }, DEFAULT_INPUT_TIMER);
                  }}
                />
              </div>
            </div>
          </div>
          {closingDays.length === 0 && (
            <p className="mt-2 text-red-500 text-xs italic">
              {errors.recurrence?.message ? `${errors.recurrence?.message?.toString()} & `: ""}
              {errors.date?.message?.toString()}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {submit ? (
            <Player
              src="https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json"
              className="w-5 h-5"
              loop
              autoplay
            />
          ) : (
            <>Create Activity</>
          )}
        </button>
      </form>
    </div>
  );
};
