import { CreateDayDTO } from "@travel-tailor/types";

export class CreateDayDto implements CreateDayDTO {
    startTime: string;
    endTime: string;
    date: string;
}
