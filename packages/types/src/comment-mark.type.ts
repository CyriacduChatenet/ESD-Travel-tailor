import { Comment } from './comment.type'

export type CommentMark = {
  id?: string
  global?: number,
  rentability: number,
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  comment?: Comment
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export type CreateCommentMarkDTO = {
  global?: number,
  rentability: number
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  comment?: string
}

export type UpdateCommentMarkDTO = {
  global?: number,
  rentability: number
  place: number,
  waiting: number,
  explanation: number,
  arrival: number,
  comment?: string
}
