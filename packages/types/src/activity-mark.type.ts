import { Activity } from "./activity.type"

export type ActivityMark = {
  id: string
  global?: number,
  rentability: number,
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  activity?: Activity
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateActivityMarkDTO = {
  global?: number,
  rentability: number
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  activty?: string
}

export type UpdateActivityMarkDTO = {
  global?: number,
  rentability: number
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  activty?: string
}
