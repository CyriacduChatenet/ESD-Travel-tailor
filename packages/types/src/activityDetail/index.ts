import { Activity } from '../activity'
import { ActivityClosingDay } from '../activityClosingDay'
import { ActivitySchedule } from '../activitySchedule'

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
