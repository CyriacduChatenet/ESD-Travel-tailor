import { ActivityDetail } from './activity-detail.type'

export type ActivityClosingDay = {
  id: string
  date: string
  recurrence: boolean
  activityDetail?: ActivityDetail
}

export type CreateActivityClosingDayDTO = {
  date: string
  recurrence: boolean
  activityDetail?: ActivityDetail
}

export type UpdateActivityClosingDayDTO = {
  date: string
  recurrence: boolean
  activityDetail?: ActivityDetail
}
