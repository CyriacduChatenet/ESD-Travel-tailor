import { Activity } from '../activity'
import { ActivitySchedule } from '../activitySchedule'

export type ActivityDetail = {
  id: string
  duration: string
  location: string
  activity?: Activity
  schedule?: ActivitySchedule
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateActivityDetailDTO = {
  duration: string
  location: string
  activity?: Activity
  schedule?: ActivitySchedule
}

export type UpdateActivityDetailDTO = {
  duration: string
  location: string
  activity?: Activity
  schedule?: ActivitySchedule
}
