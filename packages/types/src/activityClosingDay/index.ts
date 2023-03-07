import { ActivityDetail } from '../activityDetail'

export type ActivityClosingDay = {
  id: string
  day: number
  month: string
  year: number
  reccurence: string
  activityDetail?: ActivityDetail
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateActivityClosingDayDTO = {
  day: number
  month: string
  year: number
  reccurence: string
  activityDetail?: ActivityDetail
}

export type UpdateActivityClosingDayDTO = {
  day: number
  month: string
  year: number
  reccurence: string
  activityDetail?: ActivityDetail
}
