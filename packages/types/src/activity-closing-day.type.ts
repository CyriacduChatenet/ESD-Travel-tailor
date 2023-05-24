import { ActivityDetail } from './activity-detail.type'

export type ActivityClosingDay = {
  id: string | Date
  date: string
  recurrence: boolean
  activityDetail?: ActivityDetail
}

export type CreateActivityClosingDayDTO = {
  date: string | Date
  recurrence: boolean
  activityDetail?: ActivityDetail
}

export type UpdateActivityClosingDayDTO = {
  date: string | Date
  recurrence: boolean
  activityDetail?: ActivityDetail
}
