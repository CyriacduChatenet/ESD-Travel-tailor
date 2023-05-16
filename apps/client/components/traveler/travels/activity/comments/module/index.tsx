import { FC, Dispatch, SetStateAction } from "react";

import { CommentToolbar } from "@/components/traveler/travels/activity/comments/toolBar";
import { CommentMark } from "@/components/traveler/travels/activity/comments/commentMark";
import { CommentList } from "@/components/traveler/travels/activity/comments/commentList";
import { CommentForm } from "@/components/traveler/travels/activity/comments/commentForm";

interface IProps {
    setDisplayCommentModule: Dispatch<SetStateAction<boolean>>;
}

export const CommentModule: FC<IProps> = ({ setDisplayCommentModule }) => {
    return (
        <>
        <CommentToolbar setDisplayCommentModule={setDisplayCommentModule} />
        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-5">
            <CommentMark />
            <section className="col-span-8 md:col-span-4 xl:col-span-8">
                <CommentList />
                <CommentForm />
            </section>
        </section>
        </>
    );
};