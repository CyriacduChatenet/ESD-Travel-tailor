import { ROUTES } from "@travel-tailor/constants";
import { Activity } from "@travel-tailor/types";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
  setEditorMode: Dispatch<SetStateAction<boolean>>;
  editorMode: boolean;
  data: Activity[];
}

export const AdvertiserToolBar: FC<IProps> = ({
  setEditorMode,
  editorMode,
  data,
}) => {
  return (
    <div className="w-full h-20 flex items-center mt-6">
      <Link href={ROUTES.ADVERTISER.ACTIVITY.CREATE_ACTIVITY}>
        <button
          type="submit"
          aria-live="assertive"
          aria-label="Add activity"
          className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mr-8"
        >
          Add activity
        </button>
      </Link>
      {data && data.length > 0 && (
        <>
          {editorMode === false && (
            <button
              type="submit"
              aria-live="assertive"
              aria-label="Edit activities"
              className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mr-8"
              onClick={() => setEditorMode(true)}
            >
              Edit activities
            </button>
          )}
          {editorMode && (
            <button
              type="submit"
              aria-label="Cancel"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => setEditorMode(false)}
            >
              Cancel
            </button>
          )}
        </>
      )}
    </div>
  );
};
