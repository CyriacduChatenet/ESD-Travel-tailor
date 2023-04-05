import { Traveler } from './traveler.type'
import { Day } from './day.type'

export type Travel = {
  id?: string
  traveler?: Traveler
  departureCity?: string
  destinationCity?: string
  departureDate?: Date
  returnDate?: Date
  days?: Day[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateTravelDTO = {
  traveler?: string
  departureCity?: string
  destinationCity?: string
  days?: Day[]
  departureDate?: string | Date
  returnDate?: string | Date
}

export type UpdateTravelDTO = {
  traveler?: string
  days?: Day[]
  departureCity?: string
  destinationCity?: string
  departureDate?: Date
  returnDate?: Date
}
