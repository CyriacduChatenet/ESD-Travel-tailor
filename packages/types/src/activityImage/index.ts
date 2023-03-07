import { Activity } from '../activity'

export type ActivityImage = {
  id: string
  source: string
  activity?: Activity
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateActivityImageDTO = {
  source: string
  activity?: Activity
}

export type UpdateActivityImageDTO = {
  source: string
  activity?: Activity
}
