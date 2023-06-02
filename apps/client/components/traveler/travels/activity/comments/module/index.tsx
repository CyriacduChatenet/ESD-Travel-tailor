import { FC, Dispatch, SetStateAction } from "react";
import { Activity, Comment, User } from "@travel-tailor/types";

// import { CommentToolbar } from "@/components/traveler/travels/activity/comments/toolBar";
import { CommentMark } from "@/components/traveler/travels/activity/comments/commentMark";
import { CommentList } from "@/components/traveler/travels/activity/comments/commentList";
import { CommentForm } from "@/components/traveler/travels/activity/comments/commentForm";

interface IProps {
    setDisplayCommentModule: Dispatch<SetStateAction<boolean>>;
    comments: Comment[];
    data: Activity;
    setData: Dispatch<SetStateAction<Activity>>;
    user: User;
}

export const CommentModule: FC<IProps> = ({ setDisplayCommentModule, comments, data, setData, user }) => {
    return (
        <>
        {/* <CommentToolbar setDisplayCommentModule={setDisplayCommentModule} /> */}
        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-5 mb-8 xl:mb-20">
            <CommentMark commentsLength={comments.length} marks={data.marks} />
            <section className="col-span-8 md:col-span-4 xl:col-span-8">
                <CommentList comments={comments} data={data} setData={setData} user={user} />
                <CommentForm data={data} setData={setData} comments={comments} />
            </section>
        </section>
        </>
    );
};