import { Activity } from './activity.type'
import { ActivityClosingDay } from './activity-closing-day.type'
import { ActivitySchedule } from './activity-schedule.type'

export type ActivityDetail = {
  id: string
  duration: string
  location: string
  activity?: Activity
  schedules?: ActivitySchedule[]
  closingDays?: ActivityClosingDay[]
}

export type CreateActivityDetailDTO = {
  duration: string
  location: string
  activity?: Activity
  schedules?: ActivitySchedule[]
  closingDays?: ActivityClosingDay[]
}

export type UpdateActivityDetailDTO = {
  duration: string
  location: string
  activity?: Activity
  schedules?: ActivitySchedule[]
  closingDays?: ActivityClosingDay[]
}
