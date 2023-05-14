import { Dispatch, FC, SetStateAction } from "react";

interface IProps {
    pageCurrent: number;
    setPage: Dispatch<SetStateAction<number>>;
    limit: number;
    total: number;
}

export const Paginator: FC<IProps> = ({ pageCurrent, setPage, limit, total }) => {
    const totalPages = Math.ceil(total / limit);
    return (
        <div className='w-full flex justify-around items-center'>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setPage(page)} className={`py-2 px-4 rounded ${page === pageCurrent ? `bg-blue-500 text-white` : `text-black bg-gray-100`}`}>{page}</button>
            ))}
        </div>
    );
};