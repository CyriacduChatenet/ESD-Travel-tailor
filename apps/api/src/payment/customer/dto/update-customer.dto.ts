import { Order } from "../../../payment/order/entities/order.entity";

export class UpdateCustomerDto {
    email: string;
    name: string;
    address: string;
    orders: (string | Order)[];
}
