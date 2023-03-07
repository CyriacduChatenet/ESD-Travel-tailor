import { User } from '../user'

export type ResetPasswordToken = {
  id: string
  token: string
  user: User
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateResetPasswordTokenDTO = {
  token: string
  user: string
}

export type UpdateResetPasswordTokenDTO = {
  token: string
  user: string
}
