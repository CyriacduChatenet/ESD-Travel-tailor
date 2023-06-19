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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
        >
          add Activity
        </button>
      </Link>
      {data && data.length > 0 && (
        <>
          {editorMode === false && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
              onClick={() => setEditorMode(true)}
            >
              Edit Activities
            </button>
          )}
          {editorMode && (
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
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
