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
      <div className='w-full flex flex-wrap justify-center pt-8 pb-4'>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setPage(page)}
            className={`py-2 px-4 rounded mr-2 mb-2 sm:mb-0 my-2 ${page === pageCurrent ? 'bg-blue-500 text-white' : 'text-black bg-gray-100'}`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };