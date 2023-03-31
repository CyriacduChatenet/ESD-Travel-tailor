import { UpdateOrderDTO } from "@travel-tailor/types";

export class UpdateOrderDto implements UpdateOrderDTO {
    amount: number;
    payment_id: string;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    payment_created_at: number;
    currency: string;
    paymentMethodTypes: string;
    status: string;
}
