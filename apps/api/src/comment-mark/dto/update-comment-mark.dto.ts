import { UpdateCommentMarkDTO } from "@travel-tailor/types";

export class UpdateCommentMarkDto implements UpdateCommentMarkDTO  {
    rentability: number;
    place: number;
    waiting: number;
    explanation: number;
    arrival: number;
}
