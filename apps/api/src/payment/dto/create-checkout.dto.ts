import { IsNumber, IsString } from "class-validator";

export class CreateCheckoutDto {
    @IsString()
    currency: string;

    @IsNumber()
    amount: number;
}