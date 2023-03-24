import { useFetch } from '@travel-tailor/hooks'
import { Comment, CreateActivityDTO, UpdateActivityDTO } from '@travel-tailor/types'
import { ActivityDetailService } from '../activity-detail/activity-detail.service'
import { ActivityTagService } from '../activity-tag/activity-tag.service'
import { CommentService } from '../comment/comment.service'
import { Dispatch, SetStateAction } from 'react'

import { TokenService } from '../tokens/token.service'
import { TravelerService } from '../traveler/traveler.service'
import { API_ACTIVITY_BY_NAME_ROUTE, API_ACTIVITY_ROUTE } from '@travel-tailor/constants'

const findAllActivities = async (api_url: string) => {
  return await useFetch.get(`${api_url}${API_ACTIVITY_ROUTE}`)
}

const findActivityById = async (api_url: string, id: string) => {
  return await useFetch.get(`${api_url}/${API_ACTIVITY_ROUTE}${id}`)
}

const findActivityBySlug = async (api_url: string, slug: string) => {
  return await useFetch.get(`${api_url}${API_ACTIVITY_BY_NAME_ROUTE}/${slug}`)
}

const createActivity = async (
  api_url: string,
  credentials: CreateActivityDTO
) => {
  return await useFetch.protectedPost(
    `${api_url}${API_ACTIVITY_ROUTE}`,
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

const createActivityWithRelations = async (
  api_url: string,
  credentials: CreateActivityDTO,
  tags: {name: string, id: string}[]
) => {
  const activity = await createActivity(api_url, credentials)
  tags.map(async (t) => {
    await ActivityService.updateActivity(api_url, activity.id, {...credentials, tags: [{id: t.id}]});
    await ActivityTagService.updateActivityTag(api_url, t.id, {name: t.name, activities: [{id: activity.id}]});
  })
  return await ActivityService.findActivityById(api_url, activity.id);
}

const findActivityBySlugWithRelations = async (api_url: string, slug: string, setData: any, setComments: Dispatch<SetStateAction<Comment[]>>) => {
  const a = await ActivityService.findActivityBySlug(api_url, slug);
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

export const ActivityService = {
  findAllActivities,
  findActivityById,
  findActivityBySlug,
  findActivityBySlugWithRelations,
  createActivity,
  createActivityWithRelations,
  updateActivity,
  deleteActivity,
}
