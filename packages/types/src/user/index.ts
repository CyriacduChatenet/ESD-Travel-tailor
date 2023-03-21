import { Activity } from '../activity'
import { Advertiser } from '../advertiser'
import { ResetPasswordToken } from '../reset-password-token'
import { Traveler } from '../traveler'
import { Travel } from '../travel'

export type User = {
  id: string
  username: string
  email: string
  password: string
  roles: string
  advertiser?: Advertiser
  traveler?: Traveler
  travels?: Travel[]
  resetPasswordToken: ResetPasswordToken
  activities?: Activity[]
  user?: any
  name?: string
  location?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateUserDTO = {
  username: string
  email: string
  password: string
  roles: string[]
  advertiser?: string
  traveler?: string
  resetPasswordToken: string
}

export type UpdateUserDTO = {
  username: string
  email: string
  password: string
  roles: string[]
  advertiser?: string
  traveler?: string
  resetPasswordToken: string
}
