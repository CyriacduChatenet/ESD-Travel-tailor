import { User } from './user.type'
import { Taste } from './taste.type'
import { Customer } from './customer.type'

export type Traveler = {
  id: string
  user: User
  tastes: Taste[]
  customer?: Customer
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateTravelerDTO = {
  user?: string
  tastes?: string[]
  customer?: string
}

export type UpdateTravelerDTO = {
  user?: string
  tastes?: string[]
  customer?: string
}
