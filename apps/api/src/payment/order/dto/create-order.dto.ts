import { CreateOrderDTO } from "@travel-tailor/types";
import { DeepPartial } from "typeorm";

import { Customer } from "../../../payment/customer/entities/customer.entity";

export class CreateOrderDto implements CreateOrderDTO {
    amount: number;
    payment_id: string;
    capture_method: string;
    client_secret: string;
    confirmation_method: string;
    payment_created_at: number;
    currency: string;
    paymentMethodTypes: string;
    status: string;
    customer: DeepPartial<Customer>;
}
