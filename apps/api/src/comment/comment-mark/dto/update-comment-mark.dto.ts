import { ApiProperty } from "@nestjs/swagger";
import { UpdateCommentMarkDTO } from "@travel-tailor/types";
import { IsNumber } from "class-validator";

export class UpdateCommentMarkDto implements UpdateCommentMarkDTO  {
    @IsNumber()
    @ApiProperty({
        description: 'Global',
        type: Number,
        default: 0,
        example: 0,
    })
    global?: number;

    @IsNumber()
    @ApiProperty({
        description: 'Rentability',
        type: Number,
        default: 0,
        example: 0,
    })
    rentability: number;

    @IsNumber()
    @ApiProperty({
        description: 'Place',
        type: Number,
        default: 0,
        example: 0,
    })
    place: number;

    @IsNumber()
    @ApiProperty({
        description: 'Waiting',
        type: Number,
        default: 0,
        example: 0,
    })
    waiting: number;

    @IsNumber()
    @ApiProperty({
        description: 'Explanation',
        type: Number,
        default: 0,
        example: 0,
    })
    explanation: number;

    @IsNumber()
    @ApiProperty({
        description: 'Arrival',
        type: Number,
        default: 0,
        example: 0,
    })
    arrival: number;
}
