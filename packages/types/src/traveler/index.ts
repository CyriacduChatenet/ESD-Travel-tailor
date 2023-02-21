import { User } from "../user";

export type Traveler = {
    id: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateTravelerDTO = {
    user: string[];
};

export type UpdateTravelerDTO = {
    user: string[];
};