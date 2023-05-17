import { FC } from "react";
import { Comment } from "../comment";

interface IProps {
    comments: any[];
}

export const CommentList: FC<IProps> = ({ comments }) => {
    return (
        <ul>
            {comments && comments.map((comment: any) => <Comment key={comment.id} author={comment.traveler ? comment.traveler.user.username : 'Anonymous'} role={comment.traveler ? 'Traveler' : 'Advertiser'} content={comment.content} createdAt={comment.createdAt} />)}
        </ul>
    );
};