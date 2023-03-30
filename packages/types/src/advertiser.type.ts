import { Activity } from './activity.type'
import { Customer } from './customer.type'
import { User } from './user.type'

export type Advertiser = {
  id?: string
  name?: string
  location?: string
  user?: User
  activities?: Activity[]
  customer: Customer
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateAdvertiserDTO = {
  name: string
  location: string
  user?: string
  activities?: Activity[]
}

export type UpdateAdvertiserDTO = {
  name: string
  location: string
  user: string[]
  activities: string[]
}
