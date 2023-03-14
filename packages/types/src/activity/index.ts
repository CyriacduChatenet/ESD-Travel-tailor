import { ActivityDetail, CreateActivityDetailDTO, UpdateActivityDetailDTO } from '../activityDetail'
import { ActivityImage, CreateActivityImageDTO, UpdateActivityImageDTO } from '../activityImage'
import { ActivityTag, CreateActivityTagDTO } from '../activityTag'
import { Comment } from '../comment'

export type Activity = {
  id?: string
  name?: string
  mark?: number
  slug?: string
  detail?: ActivityDetail
  image?: ActivityImage
  comments?: Comment[]
  tags?: ActivityTag[]
  advertiser?: string;
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
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
