import { useFetch } from "@travel-tailor/hooks";
import { CreateCommentDTO, UpdateCommentDTO } from "@travel-tailor/types";
import { ActivityService } from "../activity/activity.service";
import { TokenService } from "../tokens/token.service";

const findAllComments = async (api_url: string) => {
    return await useFetch.get(`${api_url}/comment`);
};

const findCommentById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}/comment/${id}`);
};

const createComment = async (api_url: string, createCommentCredential: CreateCommentDTO) => {
    return await useFetch.protectedPost(`${api_url}/comment`, {...createCommentCredential, likes: 0}, `${TokenService.getAccessToken()}`);
};

const createCommentWithRelations = async (api_url: string, createCommentCredential: CreateCommentDTO, activity_id: string) => {
    const activity = await ActivityService.findActivityById(api_url, activity_id);
    const comment = await useFetch.protectedPost(`${api_url}/comment`, {...createCommentCredential, activity: activity_id, likes: 0}, `${TokenService.getAccessToken()}`);
    await ActivityService.updateActivity(api_url, activity_id, {comments: [...activity.comments, comment._id]});
    return comment;
};

const updateComment = async (api_url: string, id: string, updateCommentCredential: UpdateCommentDTO) => {
    return await useFetch.protectedPatch(`${api_url}/comment/${id}`, updateCommentCredential, `${TokenService.getAccessToken()}`);
};

const deleteComment = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}/comment/${id}`, `${TokenService.getAccessToken()}`);
};

export const CommentService = {
    findAllComments,
    findCommentById,
    createComment,
    createCommentWithRelations,
    updateComment,
    deleteComment
};