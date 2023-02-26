import { Traveler } from '../traveler';

export type Travel = {
    id: string;
    traveler?: Traveler;
    departureCity: string;
    destinationCity: string;
    departureDate: Date;
    returnDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export type CreateTravelDTO = {
    traveler?: string;
    departureCity: string;
    destinationCity: string;
    departureDate: Date;
    returnDate: Date;
}

export type UpdateTravelDTO = {
    traveler?: string;
    departureCity: string;
    destinationCity: string;
    departureDate: Date;
    returnDate: Date;
}