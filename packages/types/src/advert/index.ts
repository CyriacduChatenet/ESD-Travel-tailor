import { Advertiser } from "../advertiser";

export type Advert = {
    id: string;
    name: string;
    advertiser?: Advertiser;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateAdvertDTO = {
    name: string;
    advertiserId?: string;
}

export type UpdateAdvertDTO = {
    name: string;
}