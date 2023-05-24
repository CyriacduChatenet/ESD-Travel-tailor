import { Activity } from './activity.type'

export type ActivityImage = {
  id: string
  source?: string
  file?: File | null
  activity: Activity
  uploadFile?: {
    Location: string
    id: string;
    ETag: string;
    key: string;
    Key: string;
    Bucket: string;
  }
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type CreateActivityImageDTO = {
  source: string
  file: File | null
  activity?: Activity
}

export type UpdateActivityImageDTO = {
  source: string
  file: File | null
  activity?: Activity
}
