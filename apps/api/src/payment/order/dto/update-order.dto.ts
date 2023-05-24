import { UpdateOrderDTO } from "@travel-tailor/types";
import { IsNumber, IsString } from "class-validator";

export class UpdateOrderDto implements UpdateOrderDTO {
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
}
