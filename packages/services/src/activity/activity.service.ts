import { useFetch } from '@travel-tailor/hooks'
import { CreateActivityDTO, UpdateActivityDTO } from '@travel-tailor/types'
import { ActivityTagService } from '../activity-tag/activity-tag.service'

import { TokenService } from '../tokens/token.service'

const findAllActivities = async (api_url: string) => {
  return await useFetch.get(`${api_url}/activity`)
}

const findActivityById = async (api_url: string, id: string) => {
  return await useFetch.get(`${api_url}/activity/${id}`)
}

const createActivity = async (
  api_url: string,
  credentials: CreateActivityDTO
) => {
  return await useFetch.protectedPost(
    `${api_url}/activity`,
    credentials,
    `${TokenService.getAccessToken()}`
  )
}

const updateActivity = async (
  api_url: string,
  id: string,
  credentials: UpdateActivityDTO
) => {
  return await useFetch.protectedPatch(
    `${api_url}/activity/${id}`,
    credentials,
    `${TokenService.getAccessToken()}`
  )
}

const deleteActivity = async (api_url: string, id: string) => {
  return await useFetch.protectedRemove(
    `${api_url}/activity/${id}`,
    `${TokenService.getAccessToken()}`
  )
}

const createActivityWithRelations = async (
  api_url: string,
  credentials: CreateActivityDTO,
  tags: any[]
) => {
  const activity = await createActivity(api_url, credentials)
  tags.map(async (t) => {
    await ActivityService.updateActivity(api_url, activity.id, {...credentials, tags: [{id: t.id}]});
    await ActivityTagService.updateActivityTag(api_url, t.id, {name: t.name, activities: [{id: activity.id}]});
  })
  return await ActivityService.findActivityById(api_url, activity.id);
}

export const ActivityService = {
  findAllActivities,
  findActivityById,
  createActivity,
  createActivityWithRelations,
  updateActivity,
  deleteActivity,
}
