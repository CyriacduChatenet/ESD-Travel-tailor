import { CreateActivityMarkDTO } from "@travel-tailor/types";

export class CreateActivityMarkDto implements CreateActivityMarkDTO {
    global?: number;
    rentability: number;
    place: number;
    waiting: number;
    explanation: number;
    arrival: number;
    activty?: string;
}
