import { IsDate, IsString } from "class-validator";

export class CreateDayDto {
    @IsString()
    startTime?: string;

    @IsString()
    endTime?: string;

    @IsDate()
    date: Date;
}
