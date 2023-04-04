import { TimeSlot } from "./time-slot.type"
import { Travel } from "./travel.type"

export type Day = {
    id: string
    startTime: string
    endTime: string
    date: Date
    activities: string[]
    travel: Travel
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}

export type CreateDayDTO = {
    startTime?: string
    endTime?: string
    date?: Date,
    travel?: Travel
}

export type UpdateDayDTO = {
    startTime?: string
    endTime?: string
    date?: Date
    travel?: Travel
    timeSlots?: TimeSlot[]
}