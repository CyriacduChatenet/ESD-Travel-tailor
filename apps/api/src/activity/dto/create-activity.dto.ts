import {
  CreateActivityDetailDTO,
  CreateActivityImageDTO,
  CreateActivityTagDTO,
  CreateActivityDTO,
} from '@travel-tailor/types'

export class CreateActivityDto implements CreateActivityDTO {
  name: string
  mark: number
  detail: CreateActivityDetailDTO
  image: CreateActivityImageDTO
}
