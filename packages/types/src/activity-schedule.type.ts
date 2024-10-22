import { ActivityDetail } from './activity-detail.type'

export type ActivitySchedule = {
  id?: string
  opening_at: string
  closing_at: string
  activityDetail?: ActivityDetail
}

export type CreateActivityScheduleDTO = {
  opening_at: string
  closing_at: string
  activityDetail?: ActivityDetail
}

export type UpdateActivityScheduleDTO = {
  opening_at: string
  closing_at: string
  activityDetail?: ActivityDetail
}
