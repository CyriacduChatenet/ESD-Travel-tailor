import { useFetch } from '@travel-tailor/hooks'
import { Activity, ActivityTag, Comment, CreateActivityDTO, UpdateActivityDTO } from '@travel-tailor/types'
import { ActivityDetailService } from './activity-detail.service'
import { ActivityTagService } from './activity-tag.service'
import { CommentService } from './comment.service'
import { Dispatch, SetStateAction } from 'react'
import { API_ACTIVITY_BY_NAME_ROUTE, API_ACTIVITY_ROUTE } from '@travel-tailor/constants'

import { TokenService } from './token.service'
import { TravelerService } from './traveler.service'

const findAllActivities = async (api_url: string, setError: Dispatch<SetStateAction<any>>): Promise<Activity[]> => {
  const data = await useFetch.get(`${api_url}${API_ACTIVITY_ROUTE}`, setError)
  return data.data
}

const findActivityById = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>): Promise<Activity> => {
  return await useFetch.get(`${api_url}${API_ACTIVITY_ROUTE}/${id}`, setError)
}

const findActivityBySlug = async (api_url: string, slug: string, setError: Dispatch<SetStateAction<any>>): Promise<Activity> => {
  return await useFetch.get(`${api_url}${API_ACTIVITY_BY_NAME_ROUTE}/${slug}`, setError)
}

const createActivity = async (
  api_url: string,
  credentials: CreateActivityDTO,
  setError: Dispatch<SetStateAction<any>>
): Promise<Activity> => {
  return await useFetch.protectedPost(
    `${api_url}${API_ACTIVITY_ROUTE}`,
    credentials,
    `${TokenService.getAccessToken()}`,
    setError
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
  credentials: UpdateActivityDTO,
  setError: Dispatch<SetStateAction<any>>
): Promise<Activity> => {
  return await useFetch.protectedPatch(
    `${api_url}${API_ACTIVITY_ROUTE}/${id}`,
    credentials,
    `${TokenService.getAccessToken()}`,
    setError
  )
}

const updateActivityFormData = async (
  api_url: string,
  id: string,
  credentials: UpdateActivityDTO | any | FormData,
  setError: Dispatch<SetStateAction<any>>
): Promise<Activity> => {
  return await useFetch.protectedPatchFormData(
    `${api_url}${API_ACTIVITY_ROUTE}/${id}`,
    credentials,
    `${TokenService.getAccessToken()}`,
    setError
  )
}

const deleteActivity = async (api_url: string, id: string, setError: Dispatch<SetStateAction<any>>) => {
  return await useFetch.protectedRemove(
    `${api_url}${API_ACTIVITY_ROUTE}/${id}`,
    `${TokenService.getAccessToken()}`,
    setError
  )
}

const createActivityWithRelations = async (api_url: string, credentials: CreateActivityDTO | any | FormData, tags: ActivityTag[], setError: Dispatch<SetStateAction<any>>) => {
      const activity = await createActivityFormData(api_url, credentials)
      const ac = await findActivityById(api_url, activity.id, setError)
      if (Array.isArray(ac.tags)) {
        ac.tags = [...ac.tags, ...tags];
      } else {
        ac.tags = tags;
      }

      await updateActivity(api_url, activity.id, activity, setError);
      
      return ac;
}

const findActivityBySlugWithRelations = async (api_url: string, slug: string, setData: Dispatch<SetStateAction<Activity>>, setComments: Dispatch<SetStateAction<Comment[]>>, setError: Dispatch<SetStateAction<any>>) => {
  const a = await findActivityBySlug(api_url, slug, setError);
  const activityDetail = await ActivityDetailService.findActivityDetailById(api_url, a?.detail?.id, setError);
  const activity = { ...a, detail: activityDetail }
  setData(activity);

  a.comments.map(async (c: Comment) => {
    const comment = await CommentService.findCommentById(api_url, c.id, setError);
    if(comment.traveler) {
      const traveler = await TravelerService.findTravelerById(api_url, await comment?.traveler?.id, setError);
      setComments(prevComments => [...prevComments, {...comment, traveler}]);
      setComments(prevComments => prevComments.filter((comment, index, self) =>
      index === self.findIndex((c) => c.id === comment.id)
      ).sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1));
    }
  });
};

const updateActivityWithRelations = async (api_url: string, activityId: string, credentials: CreateActivityDTO | any | FormData, tags: ActivityTag[], setError: Dispatch<SetStateAction<any>>) => {
  const ac = await findActivityById(api_url, activityId, setError)
  if (Array.isArray(ac.tags)) {
    ac.tags = [...ac.tags, ...tags];
  } else {
    ac.tags = tags;
  }
  const activity = await updateActivityFormData(api_url,activityId, credentials, setError)
  
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
