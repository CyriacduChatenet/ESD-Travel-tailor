import { Dispatch, FC, SetStateAction } from "react";
import { Comment } from "../comment";
import { Activity, Comment as CommentType, User } from "@travel-tailor/types";

interface IProps {
    comments: CommentType[];
    user: User;
    data: Activity;
    setData: Dispatch<SetStateAction<Activity>>;
}

export const CommentList: FC<IProps> = ({ comments, user, data, setData }) => {
    return (
        <ul>
            {comments && comments.map((comment: CommentType) => <Comment data={data} setData={setData} key={comment.id} id={comment.id} user={user} author={comment?.traveler?.user ? comment?.traveler?.user?.username : 'Anonymous'} role={comment.traveler ? 'Traveler' : 'Advertiser'} content={comment.content} createdAt={comment.createdAt} />)}
        </ul>
    );
};