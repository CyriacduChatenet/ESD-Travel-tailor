import { Traveler } from '../traveler';

export type Comment = {
    id: string;
    content: string;
    likes: number;
    traveler?: Traveler;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateCommentDTO = {
    content: string;
    likes: number;
    traveler?: Traveler;
}

export type UpdateCommentDTO = {
    content: string;
    likes: number;
    traveler?: string;
}