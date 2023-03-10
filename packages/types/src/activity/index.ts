import { ActivityDetail, CreateActivityDetailDTO, UpdateActivityDetailDTO } from '../activityDetail'
import { ActivityImage, CreateActivityImageDTO, UpdateActivityImageDTO } from '../activityImage'
import { ActivityTag, CreateActivityTagDTO, UpdateActivityTagDTO } from '../activityTag'
import { Advertiser } from '../advertiser'

export type Activity = {
  id: string
  name: string
  mark: number
  activityDetail?: ActivityDetail
  image?: ActivityImage
  tags?: ActivityTag[]
  advertiser : string;
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateActivityDTO = {
  name: string
  mark: number
  detail: CreateActivityDetailDTO
  image: CreateActivityImageDTO
  advertiser? : string
  tags?: CreateActivityTagDTO[]
}

export type UpdateActivityDTO = {
  name: string
  mark: number
  detail?: UpdateActivityDetailDTO
  image?: UpdateActivityImageDTO
  tags?: UpdateActivityTagDTO[]
}
