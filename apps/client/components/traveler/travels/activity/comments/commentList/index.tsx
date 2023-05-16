import { FC } from "react";
import { Comment } from "@/components/traveler/travels/activity/comments/comment";
import { Comment as CommentType } from '@travel-tailor/types'

interface IProps {
    comments: Comment[];
}

export const CommentList: FC<IProps> = ({ comments }) => {
    console.log(comments);
    return (
        <ul>
            {comments && comments.map((comment) => <Comment key={comment.id} author={'author'} content={comment.content} createdAt={comment.createdAt} />)}
        </ul>
    );
};