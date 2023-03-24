import { User } from './user.type'

export type ResetPasswordToken = {
  id: string
  token: string
  user: string | User
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateResetPasswordTokenDTO = {
  token: string
  user: string
}

export type UpdateResetPasswordTokenDTO = {
  token: string
  user: string
}
