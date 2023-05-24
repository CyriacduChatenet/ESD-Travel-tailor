import { UpdateActivityMarkDTO } from "@travel-tailor/types";
import { IsNumber, IsString } from "class-validator";

export class UpdateActivityMarkDto implements UpdateActivityMarkDTO {
    @IsNumber()
    global: number;

    @IsNumber()
    rentability: number;

    @IsNumber()
    place: number;

    @IsNumber()
    waiting: number;

    @IsNumber()
    explanation: number;

    @IsNumber()
    arrival: number;

    @IsString()
    activty?: string;
}
