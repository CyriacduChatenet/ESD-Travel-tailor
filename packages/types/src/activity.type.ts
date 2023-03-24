import { ActivityDetail, CreateActivityDetailDTO, UpdateActivityDetailDTO } from './activity-detail.type'
import { ActivityImage, CreateActivityImageDTO, UpdateActivityImageDTO } from './activiity-image.type'
import { ActivityTag, CreateActivityTagDTO } from './activity-tag.type'
import { Comment } from './comment.type'

export type Activity = {
  id: string
  name: string
  mark: number
  slug: string
  detail: ActivityDetail
  image: ActivityImage
  comments: Comment[]
  tags: ActivityTag[]
  advertiser: string;
}

export type CreateActivityDTO = {
  name: string
  mark: number
  detail: CreateActivityDetailDTO
  image: CreateActivityImageDTO
  advertiser? : string
  tags?: CreateActivityTagDTO[]
  comments?: Comment[]
}

export type UpdateActivityDTO = {
  name?: string
  mark?: number
  detail?: UpdateActivityDetailDTO
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
}