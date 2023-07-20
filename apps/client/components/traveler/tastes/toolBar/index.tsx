import { useUser } from "@travel-tailor/contexts";
import { ROUTES } from "@travel-tailor/constants";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
    setEditorMode: Dispatch<SetStateAction<boolean>>;
    editorMode: boolean;
}

export const TasteToolBar: FC<IProps> = ({ setEditorMode, editorMode }) => {
    const { user } = useUser();
    return (
        <div className="w-full h-20 flex items-center mt-6">
            <Link href={`${ROUTES.TRAVELER.TASTE.CREATE}/${String(user?.traveler?.id)}`}>
                <button
                    type="submit"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
                >
                    Add Taste
                </button>
            </Link>
            {editorMode === false && <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-8"
                onClick={() => setEditorMode(true)}
            >
                Edit Taste
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