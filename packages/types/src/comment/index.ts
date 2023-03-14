import { Traveler } from '../traveler'

export type Comment = {
  id: string
  content: string
  likes: number
  traveler?: Traveler
}

export type CreateCommentDTO = {
  content: string
  traveler?: string
  activity?: string
}

export type UpdateCommentDTO = {
  content: string
  likes: number
  traveler?: string
  activity?: string
}
