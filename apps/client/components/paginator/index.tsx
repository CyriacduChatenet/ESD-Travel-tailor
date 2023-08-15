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
            className={`rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 mr-2 mb-2 sm:mb-0 my-2 ${page === pageCurrent ? 'focus-visible:outline-cyan-600 text-white' : 'text-black bg-gray-100'}`}
            aria-label={`Page ${page}`}
            aria-current={page === pageCurrent ? 'page' : undefined}  
          >
            {page}
          </button>
        ))}
      </div>
    );
  };