import { ActivityDetail, CreateActivityDetailDTO, UpdateActivityDetailDTO } from './activity-detail.type'
import { ActivityImage, CreateActivityImageDTO, UpdateActivityImageDTO } from './activiity-image.type'
import { ActivityTag, CreateActivityTagDTO } from './activity-tag.type'
import { Comment } from './comment.type'
import { TimeSlot } from './time-slot.type'
import { ActivityMark } from './activity-mark.type'

export type Activity = {
  id: string
  name: string
  marks: ActivityMark
  slug: string
  description: string
  detail: ActivityDetail
  image: ActivityImage
  comments: Comment[]
  tags: ActivityTag[]
  timeSlots: TimeSlot[]
  advertiser: string;
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateActivityDTO = {
  name: string
  marks?: ActivityMark
  detail: CreateActivityDetailDTO
  description: string
  image: CreateActivityImageDTO
  advertiser? : string
  tags?: CreateActivityTagDTO[]
  timeSlots?: TimeSlot[]
  comments?: Comment[]
}

export type UpdateActivityDTO = {
  name?: string
  marks?: ActivityMark
  detail?: UpdateActivityDetailDTO
  description: string
  image?: UpdateActivityImageDTO
  tags?: {id: string}[]
  comments?: Comment[]
}

export type ActivityQuery = {
  page?: number
  limit?: number
  name?: string
  sortedBy?: 'ASC' | 'DESC'
  tags?: string
  location?: string
  duration?: string
  opening_at?: string
  closing_at?: string,
  closed_day?: string
  marks?: ActivityMark
}