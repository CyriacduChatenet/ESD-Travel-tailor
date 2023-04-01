export type Day = {
    id: string
    startTime: string
    endTime: string
    date: string
    activities: string[]
    travel: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}

export type CreateDayDTO = {
    startTime?: string
    endTime?: string
    date?: string
}

export type UpdateDayDTO = {
    startTime?: string
    endTime?: string
    date?: string
}