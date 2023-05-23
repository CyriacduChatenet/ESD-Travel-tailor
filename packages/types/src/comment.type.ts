import { CommentMark } from './comment-mark.type'

export type Comment = {
  id: string
  content: string
  likes: number,
  marks?: CommentMark
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
