import { Advert } from "../advert";
import { User } from "../user";

export type Advertiser = {
    id: string;
    name: string;
    location: string;
    user?: User;
    adverts?: Advert[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateAdvertiserDTO = {
    name: string;
    location: string;
    user?: string;
    adverts?: Advert[];
}

export type UpdateAdvertiserDTO = {
    name: string;
    location: string;
    user: string[];
    adverts: string[];
}