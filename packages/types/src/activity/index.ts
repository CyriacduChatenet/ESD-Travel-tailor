import { ActivityDetail } from '../activityDetail';
import { ActivityImage } from '../activityImage';
import { ActivityTag } from '../activityTag';

export type Activity = {
    id: string;
    name: string;
    mark: number;
    activityDetail?: ActivityDetail;
    image?: ActivityImage;
    tags?: ActivityTag[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateActivityDTO = {
    name: string;
    mark: number;
    activityDetail?: ActivityDetail;
    image?: ActivityImage;
    tags?: ActivityTag[];
}

export type UpdateActivityDTO = {
    name: string;
    mark: number;
    activityDetail?: ActivityDetail;
    mage?: ActivityImage;
    tags?: ActivityTag[];
}