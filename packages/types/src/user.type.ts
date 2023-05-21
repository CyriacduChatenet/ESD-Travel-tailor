import { Activity } from './activity.type'
import { Advertiser } from './advertiser.type'
import { ResetPasswordToken } from './reset-password.type'
import { Traveler } from './traveler.type'
import { Travel } from './travel.type'
import { Taste } from './taste.type'

export type User = {
  id: string
  username: string
  email: string
  password: string
  roles: string
  advertiser?: Advertiser
  traveler?: Traveler
  travels?: Travel[]
  tastes?: Taste[]
  resetPasswordToken: ResetPasswordToken
  activities?: Activity[]
  user?: string | User
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
  username?: string
  email?: string
  password?: string
  roles?: string
  advertiser?: string
  traveler?: string
  resetPasswordToken?: string
}
