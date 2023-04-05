import { Activity } from './activity.type'
import { ActivityClosingDay } from './activity-closing-day.type'
import { ActivitySchedule } from './activity-schedule.type'

export type ActivityDetail = {
  id: string
  duration: number
  location: string
  activity?: Activity
  schedules?: ActivitySchedule[]
  closingDays?: ActivityClosingDay[]
}

export type CreateActivityDetailDTO = {
  duration: number
  location: string
  activity?: Activity
  schedules?: ActivitySchedule[]
  closingDays?: ActivityClosingDay[]
}

export type UpdateActivityDetailDTO = {
  duration: number
  location: string
  activity?: Activity
  schedules?: ActivitySchedule[]
  closingDays?: ActivityClosingDay[]
}
