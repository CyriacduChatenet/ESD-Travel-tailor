import { UpdateActivityMarkDTO } from "@travel-tailor/types";

export class UpdateActivityMarkDto implements UpdateActivityMarkDTO {
    global?: number;
    rentability: number;
    place: number;
    waiting: number;
    explanation: number;
    arrival: number;
    activty?: string;
}
