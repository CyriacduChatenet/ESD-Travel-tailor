import { Invoice } from "@/../../packages/types/src";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { InvoiceCard } from "../invoiceCard";
import { set } from "react-hook-form";

interface IProps {
    invoices: Invoice[];
    setSelectedInvoiceId: Dispatch<SetStateAction<string>>
}

export const InvoicesList: FC<IProps> = ({ invoices, setSelectedInvoiceId }) => {
    return (
        <ul className="col-span-4 md:col-span-8 xl:col-span-7">
            {invoices !== null && invoices !== undefined && invoices.map((invoice: Invoice) => <div key={invoice.id} onClick={() => setSelectedInvoiceId(invoice.id)}><InvoiceCard invoice={invoice} /></div>)}
        </ul>
    );
};