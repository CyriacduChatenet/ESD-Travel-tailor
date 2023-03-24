import { useFetch } from "@travel-tailor/hooks";
import { CreateCommentDTO, UpdateCommentDTO, Comment } from "@travel-tailor/types";
import { ActivityService } from "../activity/activity.service";
import { TokenService } from "../tokens/token.service";
import { Dispatch, SetStateAction } from "react";
import { API_COMMENT_ROUTE } from "@travel-tailor/constants";

const findAllComments = async (api_url: string) => {
    return await useFetch.get(`${api_url}${API_COMMENT_ROUTE}`);
};

const findCommentById = async (api_url: string, id: string) => {
    return await useFetch.get(`${api_url}${API_COMMENT_ROUTE}/${id}`);
};

const createComment = async (api_url: string, createCommentCredential: CreateCommentDTO) => {
    return await useFetch.protectedPost(`${api_url}${API_COMMENT_ROUTE}`, createCommentCredential, `${TokenService.getAccessToken()}`);
};

const createCommentWithRelations = async (api_url: string, createCommentCredential: CreateCommentDTO, activity_id: string) => {
    const activity = await ActivityService.findActivityById(api_url, activity_id);
    const comment = await useFetch.protectedPost(`${api_url}${API_COMMENT_ROUTE}`, {...createCommentCredential, activity: activity_id, likes: 0}, `${TokenService.getAccessToken()}`);
    await ActivityService.updateActivity(api_url, activity_id, {comments: [...activity.comments, comment._id]});
    return comment;
};

const updateComment = async (api_url: string, id: string, updateCommentCredential: UpdateCommentDTO) => {
    return await useFetch.protectedPatch(`${api_url}${API_COMMENT_ROUTE}/${id}`, updateCommentCredential, `${TokenService.getAccessToken()}`);
};

const deleteComment = async (api_url: string, id: string) => {
    return await useFetch.protectedRemove(`${api_url}${API_COMMENT_ROUTE}/${id}`, `${TokenService.getAccessToken()}`);
};

const likeComment = async (api_url: string, comment: Comment, setComments: Dispatch<SetStateAction<Comment[]>>, comments : Comment[]) => {
    const updatedComments = comments.map((c) => {
      if (c.id === comment.id) {
        return { ...c, likes: c.likes += 1 };
      }
      return c;
    });
    const com = await CommentService.findCommentById(api_url, comment.id);
    await CommentService.updateComment(api_url, comment.id, { likes: com.likes += 1 })
    setComments(updatedComments);
  };

const dislikeComment = async (api_url: string, comment: Comment, setComments: Dispatch<SetStateAction<Comment[]>>, comments : Comment[]) => {
    const updatedComments = comments.map((c) => {
      if (c.id === comment.id && comment.likes > 0) {
        return { ...c, likes: c.likes -= 1 };
      }
      return c;
    });
    const com = await CommentService.findCommentById(api_url, comment.id);
    if(comment.likes > 0) {
        await CommentService.updateComment(api_url, comment.id, { likes: com.likes -= 1 })
    }
    setComments(updatedComments);
  };

export const CommentService = {
    findAllComments,
    findCommentById,
    createComment,
    createCommentWithRelations,
    updateComment,
    deleteComment,
    likeComment,
    dislikeComment
};