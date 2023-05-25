import { User } from './user.type'
import { Taste } from './taste.type'
import { Travel } from './travel.type'
import { Comment } from './comment.type'

export type Traveler = {
  id: string
  user: User
  tastes: Taste[]
  travels: Travel[]
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateTravelerDTO = {
  user?: string
  name?: string
  email?: string
  tastes?: string[]
}

export type UpdateTravelerDTO = {
  user?: string
  tastes?: string[]
}
