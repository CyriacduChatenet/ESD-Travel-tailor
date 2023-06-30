import { ApiProperty } from "@nestjs/swagger";
import { CreateActivityMarkDTO } from "@travel-tailor/types";
import { IsNumber, IsString } from "class-validator";

export class CreateActivityMarkDto implements CreateActivityMarkDTO {
    @IsNumber()
    @ApiProperty({
        description: 'Global',
        type: Number,
        default: 1,
        example: 1,
    })
    global?: number;

    @IsNumber()
    @ApiProperty({
        description: 'Price',
        type: Number,
        default: 1,
        example: 1,
    })
    rentability: number;

    @IsNumber()
    @ApiProperty({
        description: 'Price',
        type: Number,
        default: 1,
        example: 1,
    })
    place: number;

    @IsNumber()
    @ApiProperty({
        description: 'Price',
        type: Number,
        default: 1,
        example: 1,
    })
    waiting: number;

    @IsNumber()
    @ApiProperty({
        description: 'Price',
        type: Number,
        default: 1,
        example: 1,
    })
    explanation: number;

    @IsNumber()
    @ApiProperty({
        description: 'Price',
        type: Number,
        default: 1,
        example: 1,
    })
    arrival: number;

    @IsString()
    @ApiProperty({
        description: 'Activity',
        type: String,
        default: 'Activity',
        example: 'Activity',
    })
    activty?: string;
}
