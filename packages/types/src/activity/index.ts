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
  advertiserId? : string;
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateActivityDTO = {
  name: string
  mark: number
  activityDetail?: CreateActivityDetailDTO
  advertiserId? : string
  activityImage?: CreateActivityImageDTO
  activityTags?: CreateActivityTagDTO[]
}

export type UpdateActivityDTO = {
  name: string
  mark: number
  activityDetail?: UpdateActivityDetailDTO
  advertiserId? : string;
  mage?: UpdateActivityImageDTO
  tags?: UpdateActivityTagDTO[]
}
