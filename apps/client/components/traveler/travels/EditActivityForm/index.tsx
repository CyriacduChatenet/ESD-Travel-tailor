import { ROUTES } from "@/../../packages/constants/src";
import Cookies from "js-cookie";
import {
  ActivityService,
  PlanningService,
} from "@/../../packages/services/src";
import { Activity } from "@/../../packages/types/src";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FC, useMemo, useState } from "react";

export const EditActivityForm: FC = () => {
  const [newActivityId, setNewActivityId] = useState("");
  const [credentials, setCredentials] = useState<any>({});
  const [apiResponse, setApiResponse] = useState<any[]>([]);
  const [error, setError] = useState({});


  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCredentials({ [name]: value });
  };

  const handleClick = (id: string, name: string) => {
    setNewActivityId(id);
    setCredentials({ activity: name });
  };

  const handleSubmit = async () => {
    const response = await PlanningService.updatePlanningActivity(
      `${process.env.NEXT_PUBLIC_API_URL}`,
      Cookies.get("travel_id") as string,
      Cookies.get("day_id") as string,
      Cookies.get("timeSlot_id") as string,
      newActivityId
    );
      router.push(ROUTES.TRAVELER.DASHBOARD);
  };

  useMemo(async () => {
    setTimeout(async () => {
      const response = await ActivityService.findAllActivitiesLikeName(
        `${process.env.NEXT_PUBLIC_API_URL}`,
        setError,
        `${credentials.activity}`
      );
      if (response) {
        setApiResponse(response);
      }
    }, 1000);
  }, [credentials]);

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="activity">Activity</label>
        <input
          type="text"
          id="new_activity_id"
          name="activity"
          placeholder="Activity id"
          value={credentials.activity}
          onChange={handleChange}
          aria-label="Activity id input"
        />
      </div>
      <ul>
        {apiResponse &&
          apiResponse.length > 0 &&
          apiResponse !== undefined &&
          apiResponse.map((activity: Activity) => (
            <li
              key={activity.id}
              onClick={() => handleClick(activity.id, activity.name)}
            >
              {activity.name}
            </li>
          ))}
      </ul>
      <button
        type="submit"
        aria-live="assertive"
        aria-label="Edit activity"
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Edit Activity
      </button>
    </form>
  );
};
