import { FC } from "react";
import { Comment } from "@/components/traveler/travels/activity/comments/comment";

interface IProps {
    comments: Comment[];
}

export const CommentList: FC<IProps> = ({ comments }) => {
    console.log(comments);
    return (
        <ul>
            {comments && comments.map((comment: any) => <Comment key={comment.id} author={'author'} content={comment.content} createdAt={comment.createdAt} />)}
        </ul>
    );
};