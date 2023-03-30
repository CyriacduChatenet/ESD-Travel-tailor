import { CreateCustomerDTO } from "@travel-tailor/types";

export class CreateCustomerDto implements CreateCustomerDTO {
    email?: string;
    name?: string;
    stripeId?: string;
    address?: string;
}
