import { CreateCommentMarkDTO } from "@travel-tailor/types";

export class CreateCommentMarkDto implements CreateCommentMarkDTO {
    global?: number;
    rentability: number;
    place: number;
    waiting: number;
    explanation: number;
    arrival: number;
}
