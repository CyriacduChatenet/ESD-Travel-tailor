import { FC } from "react";
import { Invoice } from "@travel-tailor/types";

interface IProps {
    invoice: Invoice;
};

export const InvoiceCard: FC<IProps> = ({ invoice }) => {
    return (
        <li className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:grid xl:grid-cols-12 xl:gap-5 lg:pr-20'>
            <div>
                <p>{invoice.id}</p>
            </div>
        </li>
    );
};