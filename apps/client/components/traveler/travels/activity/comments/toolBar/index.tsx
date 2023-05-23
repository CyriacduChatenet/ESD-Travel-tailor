import { Icon } from "@iconify/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
    setDisplayCommentModule: Dispatch<SetStateAction<boolean>>;
}

interface ISearchForm {
    search: string;
}

export const CommentToolbar: FC<IProps> = ({ setDisplayCommentModule }) => {
    const [apiErrors, setApiErrors] = useState<any>();
    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ISearchForm>();

    const onSubmit = async (data: ISearchForm) => {
    };
    
    return (
        <div className="py-4 lg:py-8 w-full flex flex-col xl:grid xl:grid-cols-12">
            <div className="lg:col-span-2 flex lg:items-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setDisplayCommentModule(false)}>Return</button>
            </div>
            <div className="lg:col-span-10 flex flex-col lg:flex-row lg:items-center lg:grid lg:grid-cols-10">
                <p className="lg:col-span-1 my-4 lg:my-0">Filters:</p>
                <div className="lg:col-span-6 flex justify-around items-center">
                    <span className="flex items-center">
                        <Icon icon="material-symbols:calendar-today-rounded" className="w-6 h-6" />
                        <p className="px-4">Date</p>
                        <Icon icon="mdi:chevron-down" className="w-8 h-8" />
                    </span>
                    <span className="flex items-center">
                        <Icon icon="material-symbols:note-alt" className="w-6 h-6" />
                        <p className="px-4">Note</p>
                        <Icon icon="mdi:chevron-down" className="w-8 h-8" />
                    </span>
                    <span className="flex items-center">
                        <Icon icon="material-symbols:person" className="w-6 h-6" />
                        <p className="px-4">Role</p>
                        <Icon icon="mdi:chevron-down" className="w-8 h-8" />
                    </span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 flex justify-between items-center my-8 lg:my-0">
                    <div className="">
                        <input
                            {...register("search", {
                                required: "Search is required",
                            })}
                            id="search"
                            type="text"
                            onClick={() => setApiErrors({})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.search && <p className="mt-2 text-red-500 text-xs italic">{errors.search.message?.toString()}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${submit && 'cursor-not-allowed py-3 px-12'}`}
                    >Search
                    </button>
                </form>
            </div>
        </div>
    );
};