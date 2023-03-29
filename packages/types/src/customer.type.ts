import { Order } from "./order.type";
import { Traveler } from "./traveler.type";


export type Customer = {
    id: string;
    email: string;
    name: string;
    address: string;
    orders: Order[] | string[];
    traveler: Traveler;
}

export type CreateCustomerDTO = {
    email: string;
    name: string;
    address: string;
}

export type UpdateCustomerDTO = {
    email?: string;
    name?: string;
    address?: string;
}