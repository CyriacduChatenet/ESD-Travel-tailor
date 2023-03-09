import { ActivityDetail } from '../activityDetail'
import { ActivityImage } from '../activityImage'
import { ActivityTag } from '../activityTag'
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
  activityDetail?: ActivityDetail
  advertiserId? : string
  image?: ActivityImage
  tags?: ActivityTag[]
}

export type UpdateActivityDTO = {
  name: string
  mark: number
  activityDetail?: ActivityDetail
  advertiserId? : string;
  mage?: ActivityImage
  tags?: ActivityTag[]
}
