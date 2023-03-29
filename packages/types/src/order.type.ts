import { Customer } from "./customer.type";

export type Order = {
    id: string;
    customer: Customer | string;
}

export type CreateOrderDTO = {}

export type UpdateOrderDTO = {}