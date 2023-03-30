import { Order } from "./order.type";
import { Traveler } from "./traveler.type";


export type Customer = {
    id: string;
    email?: string;
    stripeId: string;
    name?: string;
    address?: string;
    traveler?: Traveler;
}

export type CreateCustomerDTO = {
    email?: string;
    name?: string;
    address?: string;
    stripeId?: string;
}

export type UpdateCustomerDTO = {
    email?: string;
    name?: string;
    address?: string;
}