import { IsString } from "class-validator";

import { Order } from "../../../payment/order/entities/order.entity";

export class UpdateCustomerDto {
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    address: string;
    
    orders: (string | Order)[];
}
