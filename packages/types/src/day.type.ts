import { TimeSlot } from "./time-slot.type"
import { Travel } from "./travel.type"

export type Day = {
    id?: string
    startTime: Date
    endTime: Date
    date: Date
    timeSlots: TimeSlot[]
    travel: Travel
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}

export type CreateDayDTO = {
    startTime?: Date
    endTime?: Date
    date?: Date,
    travel?: Travel
}

export type UpdateDayDTO = {
    startTime?: Date
    endTime?: Date
    date?: Date
    travel?: Travel
    timeSlots?: TimeSlot[]
}