import { useFetch } from '@travel-tailor/hooks'
import { Activity, ActivityTag, Comment, CreateActivityDTO, UpdateActivityDTO } from '@travel-tailor/types'
import { ActivityDetailService } from './activity-detail.service'
import { ActivityTagService } from './activity-tag.service'
import { CommentService } from './comment.service'
import { Dispatch, SetStateAction } from 'react'
import { API_ACTIVITY_BY_NAME_ROUTE, API_ACTIVITY_ROUTE } from '@travel-tailor/constants'

import { TokenService } from './token.service'
import { TravelerService } from './traveler.service'

const findAllActivities = async (api_url: string): Promise<Activity[]> => {
  const data = await useFetch.get(`${api_url}${API_ACTIVITY_ROUTE}`)
  return data.data
}

const findActivityById = async (api_url: string, id: string): Promise<Activity> => {
  return await useFetch.get(`${api_url}${API_ACTIVITY_ROUTE}/${id}`)
}

const findActivityBySlug = async (api_url: string, slug: string): Promise<Activity> => {
  return await useFetch.get(`${api_url}${API_ACTIVITY_BY_NAME_ROUTE}/${slug}`)
}

const createActivity = async (
  api_url: string,
  credentials: CreateActivityDTO
): Promise<Activity> => {
  return await useFetch.protectedPost(
    `${api_url}${API_ACTIVITY_ROUTE}`,
    credentials,
    `${TokenService.getAccessToken()}`
  )
}

const createActivityFormData = async (
  api_url: string,
  credentials: FormData
): Promise<Activity> => {
  const response = await fetch(`${api_url}${API_ACTIVITY_ROUTE}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${TokenService.getAccessToken()}`,
    },
    body: credentials,
  })
  const data = await response.json()
  return data;
}

const updateActivity = async (
  api_url: string,
  id: string,
  credentials: UpdateActivityDTO
): Promise<Activity> => {
  return await useFetch.protectedPatch(
    `${api_url}${API_ACTIVITY_ROUTE}/${id}`,
    credentials,
    `${TokenService.getAccessToken()}`
  )
}

const updateActivityFormData = async (
  api_url: string,
  id: string,
  credentials: UpdateActivityDTO | any | FormData,
): Promise<Activity> => {
  return await useFetch.protectedPatchFormData(
    `${api_url}${API_ACTIVITY_ROUTE}/${id}`,
    credentials,
    `${TokenService.getAccessToken()}`
  )
}

const deleteActivity = async (api_url: string, id: string) => {
  return await useFetch.protectedRemove(
    `${api_url}${API_ACTIVITY_ROUTE}/${id}`,
    `${TokenService.getAccessToken()}`
  )
}

const createActivityWithRelations = async (api_url: string, credentials: CreateActivityDTO | any | FormData, tags: ActivityTag[]) => {
      const activity = await createActivityFormData(api_url, credentials)
      const ac = await findActivityById(api_url, activity.id)
      activity.tags = [...ac.tags, ...tags];

      await updateActivity(api_url, activity.id, activity);
      
      return ac;
}

const findActivityBySlugWithRelations = async (api_url: string, slug: string, setData: Dispatch<SetStateAction<Activity>>, setComments: Dispatch<SetStateAction<Comment[]>>) => {
  const a = await findActivityBySlug(api_url, slug);
  const activityDetail = await ActivityDetailService.findActivityDetailById(api_url, a?.detail?.id);
  const activity = { ...a, detail: activityDetail }
  setData(activity);

  a.comments.map(async (c: Comment) => {
    const comment = await CommentService.findCommentById(api_url, c.id);
    if(comment.traveler) {
      const traveler = await TravelerService.findTravelerById(api_url, await comment?.traveler?.id);
      setComments(prevComments => [...prevComments, {...comment, traveler}]);
      setComments(prevComments => prevComments.filter((comment, index, self) =>
      index === self.findIndex((c) => c.id === comment.id)
      ).sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1));
    }
  });
};

const updateActivityWithRelations = async (api_url: string, activityId: string, credentials: CreateActivityDTO | any | FormData, tags: ActivityTag[]) => {
  const ac = await findActivityById(api_url, activityId)
  ac.tags = [...ac.tags, ...tags];
  const activity = await updateActivityFormData(api_url,activityId, credentials)
  
  return activity;
}

export const ActivityService = {
  findAllActivities,
  findActivityById,
  findActivityBySlug,
  findActivityBySlugWithRelations,
  createActivity,
  createActivityWithRelations,
  updateActivity,
  updateActivityFormData,
  updateActivityWithRelations,
  deleteActivity,
}
