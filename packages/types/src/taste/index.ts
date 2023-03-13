import { Traveler } from '../traveler'

export type Taste = {
  id: string
  name: string
  traveler?: Traveler
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateTasteDTO = {
  name: string
  traveler?: string
}

export type UpdateTasteDTO = {
  traveler?: string
  name: string
}
