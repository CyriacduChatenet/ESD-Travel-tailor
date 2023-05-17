import { ROUTES } from "@travel-tailor/constants";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
    setEditorMode: Dispatch<SetStateAction<boolean>>;
    editorMode: boolean;
}

export const AdvertiserToolBar: FC<IProps> = ({ setEditorMode, editorMode }) => {
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
            {editorMode === false && <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
                onClick={() => setEditorMode(true)}
            >
                Edit Activities
            </button>}
            {editorMode && <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
                onClick={() => setEditorMode(false)}
            >
                Cancel
            </button>}
        </div>
    );
};