import { UpdateCommentMarkDTO } from "@travel-tailor/types";

export class UpdateCommentMarkDto implements UpdateCommentMarkDTO  {
    global: number;
    rentability: number;
    place: number;
    waiting: number;
    explanation: number;
    arrival: number;
}
