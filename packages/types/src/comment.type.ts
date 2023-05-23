import { CommentMark } from './comment-mark.type'
import { Traveler } from './traveler.type'

export type Comment = {
  id: string
  content: string
  likes: number,
  marks?: CommentMark
  traveler?: Traveler
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateCommentDTO = {
  content: string
  likes?: number,
  marks?: CommentMark
  traveler?: string
  activity?: string
}

export type UpdateCommentDTO = {
  content?: string
  likes?: number
  marks?: CommentMark
  traveler?: string
  activity?: string
}
