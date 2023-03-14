import { ActivityDetail } from '../activityDetail'

export type ActivityClosingDay = {
  id: string
  day: number
  month: string
  year: number
  recurrence: boolean
  activityDetail?: ActivityDetail
}

export type CreateActivityClosingDayDTO = {
  day: number
  month: string
  year: number
  recurrence: boolean
  activityDetail?: ActivityDetail
}

export type UpdateActivityClosingDayDTO = {
  day: number
  month: string
  year: number
  recurrence: boolean
  activityDetail?: ActivityDetail
}
