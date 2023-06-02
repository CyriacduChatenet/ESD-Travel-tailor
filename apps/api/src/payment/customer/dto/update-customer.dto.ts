import { IsString } from "class-validator";

export class UpdateCustomerDto {
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    address: string;
}
