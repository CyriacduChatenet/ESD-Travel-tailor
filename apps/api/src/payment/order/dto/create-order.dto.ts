import { CreateOrderDTO } from "@travel-tailor/types";
import { DeepPartial } from "typeorm";
import { IsNumber, IsObject, IsString } from "class-validator";

import { Customer } from "../../../payment/customer/entities/customer.entity";

export class CreateOrderDto implements CreateOrderDTO {
    @IsNumber()
    amount: number;

    @IsString()
    payment_id: string;

    @IsString()
    capture_method: string;

    @IsString()
    client_secret: string;

    @IsString()
    confirmation_method: string;

    @IsNumber()
    payment_created_at: number;

    @IsString()
    currency: string;

    @IsString()
    paymentMethodTypes: string;

    @IsString()
    status: string;

    @IsObject()
    customer: DeepPartial<Customer>;
}
