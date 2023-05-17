import { FC } from "react";
import { Comment } from "../comment";
import { Comment as CommentType } from "@travel-tailor/types";

interface IProps {
    comments: CommentType[];
}

export const CommentList: FC<IProps> = ({ comments }) => {
    return (
        <ul>
            {comments && comments.map((comment: CommentType) => <Comment key={comment.id} author={comment.traveler ? comment.traveler.user.username : 'Anonymous'} role={comment.traveler ? 'Traveler' : 'Advertiser'} content={comment.content} createdAt={comment.createdAt} />)}
        </ul>
    );
};