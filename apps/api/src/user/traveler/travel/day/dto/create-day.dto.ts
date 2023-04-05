import { CreateDayDTO } from "@travel-tailor/types";

export class CreateDayDto {
    startTime?: string;
    endTime?: string;
    date: Date;
}
