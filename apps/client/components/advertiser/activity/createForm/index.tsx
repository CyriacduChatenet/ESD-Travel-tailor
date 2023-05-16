import { ActivityTag } from "@travel-tailor/types";
import { useUser } from "@travel-tailor/contexts";
import { ActivityService } from "@travel-tailor/services";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface ICreateActivityForm {
    name: string;
    image: any;
    location: string;
    duration: number;
}

export const CreateActivityForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<{ message?: string }>({});
    const [tags, setTags] = useState<ActivityTag[]>([]);
    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateActivityForm>();
    const { user } = useUser();

    const onSubmit = async (data: ICreateActivityForm) => {
        if (user) {
            setSubmit(true);
            console.log(data);
            const file = data.image[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('detail[location]', data.location);
            formData.append('detail[duration]', data.duration.toString());

            formData.append('image', file);
            formData.append('advertiser', String(user?.advertiser?.id));

            await ActivityService.createActivityWithRelations(`${process.env.NEXT_PUBLIC_API_URL}`, formData, tags, setApiErrors);
        }
    };
    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
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
                    {errors.name && <p className="mt-2 text-red-500 text-xs italic">{errors.name.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Image" className="block text-gray-700 font-bold mb-2">
                        Image
                    </label>
                    <input
                        {...register("image", {
                            required: "Image is required",
                        })}
                        id="Image"
                        type="file"
                        onClick={() => setApiErrors({})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.image && <p className="mt-2 text-red-500 text-xs italic">{errors.image.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Location" className="block text-gray-700 font-bold mb-2">
                        Location
                    </label>
                    <input
                        {...register("location", {
                            required: "Location is required",
                        })}
                        id="location"
                        type="text"
                        onClick={() => setApiErrors({})}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.location && <p className="mt-2 text-red-500 text-xs italic">{errors.location.message?.toString()}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="Duration" className="block text-gray-700 font-bold mb-2">
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
                    {errors.duration && <p className="mt-2 text-red-500 text-xs italic">{errors.duration.message?.toString()}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Create Activity
                </button>
            </form>
        </div>
    );
};