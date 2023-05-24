import { CreateCommentMarkDTO } from "@travel-tailor/types";
import { IsNumber } from "class-validator";

export class CreateCommentMarkDto implements CreateCommentMarkDTO {
    @IsNumber()
    global?: number;

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
}
