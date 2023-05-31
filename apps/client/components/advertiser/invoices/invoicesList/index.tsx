import { Invoice } from "@/../../packages/types/src";
import { FC } from "react";

interface IProps {
    invoices: Invoice[];
}

export const InvoicesList: FC<IProps> = ({ invoices }) => {
    return (
        <ul>
            {invoices !== null && invoices !== undefined && invoices.map((invoice: Invoice) => <li key={invoice.id} className='px-4 py-4 my-4 xl:mr-8 bg-gray-100 rounded-lg blue flex flex-col xl:grid xl:grid-cols-12 xl:gap-5 lg:pr-20'></li>)}
        </ul>
    );
};