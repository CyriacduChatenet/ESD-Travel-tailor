import { Activity } from './activity.type'

export type ActivityTag = {
  id: string
  name: string
  activities?: Activity[]
}

export type CreateActivityTagDTO = {
  name: string
  activities?: string[]
}

export type UpdateActivityTagDTO = {
  name?: string
  activities: {id: string}[]
}

export type ActivityTagQuery = {
  name?: string
  page?: number
  limit?: number
};