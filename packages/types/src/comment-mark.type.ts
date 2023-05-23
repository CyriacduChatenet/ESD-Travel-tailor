import { Comment } from './comment.type'

export type CommentMark = {
  id?: string
  rentability: number
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  comment: Comment
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateCommentMarkDTO = {
  rentability: number
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  comment?: string
}

export type UpdateCommentMarkDTO = {
  rentability: number
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  comment?: string
}
