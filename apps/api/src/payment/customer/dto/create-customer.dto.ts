import { CreateCustomerDTO } from "@travel-tailor/types";
import { IsString } from "class-validator";

export class CreateCustomerDto implements CreateCustomerDTO {
    @IsString()
    email?: string;

    @IsString()
    name?: string;

    @IsString()
    stripeId?: string;

    @IsString()
    address?: string;
}
