import { InvoiceService } from "@/../../packages/services/src";
import { FC, useEffect, useState } from "react";

interface IProps {
    invoice_id: string;
};

export const InvoicePreview: FC<IProps> = ({ invoice_id }) => {
    const [apiErrors, setApiErrors] = useState<any>({});
    const [pdfArrayBuffer, setPdfArrayBuffer] = useState<ArrayBuffer>();

    const handleFetch = async (invoice_id: string) => {
        try {
            const response = await InvoiceService.findOnePdf(`${process.env.NEXT_PUBLIC_API_URL}`, invoice_id, setApiErrors);
            setPdfArrayBuffer(response);
        } catch (error) {
            console.error("Error fetching invoice PDF:", error);
            setApiErrors(error);
        }
    };

    const createPdfUrl = (arrayBuffer: ArrayBuffer) => {
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    };

    useEffect(() => {
        if (invoice_id.length > 0) {
            handleFetch(invoice_id);
        }
    }, [invoice_id]);
    return (
        <div className="col-span-4 md:col-span-8 xl:col-span-5">
            {pdfArrayBuffer && (
                <div style={{ position: 'relative', width: '100%', height: '0', paddingBottom: '100%' }}>
                    <iframe
                        title="PDF Preview"
                        src={createPdfUrl(pdfArrayBuffer)}
                        style={{
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            border: 'none',
                        }}
                    />
                </div>
            )}
        </div>
    );
};