import { Traveler } from './traveler.type'

export type Comment = {
  id: string
  content: string
  likes: number,
  mark: number,
  traveler?: Traveler
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateCommentDTO = {
  content: string
  likes?: number,
  mark: number,
  traveler?: string
  activity?: string
}

export type UpdateCommentDTO = {
  content?: string
  likes?: number
  traveler?: string
  activity?: string
}
