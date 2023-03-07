import { Activity } from '../activity'

export type ActivityTag = {
  id: string
  name: string
  activities?: Activity[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateActivityTagDTO = {
  name: string
  activities?: Activity[]
}

export type UpdateActivityTagDTO = {
  name: string
  activities?: Activity[]
}
