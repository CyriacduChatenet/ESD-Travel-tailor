import { User } from './user.type'
import { Taste } from './taste.type'

export type Traveler = {
  id: string
  user: User
  tastes: Taste[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateTravelerDTO = {
  user?: string
  tastes?: string[]
}

export type UpdateTravelerDTO = {
  user?: string
  tastes?: string[]
}
