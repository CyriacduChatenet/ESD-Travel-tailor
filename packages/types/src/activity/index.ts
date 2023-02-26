export type Activity = {
    id: string;
    name: string;
    mark: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateActivityDTO = {
    name: string;
    mark: number;
}

export type UpdateActivityDTO = {
    name: string;
    mark: number;
}