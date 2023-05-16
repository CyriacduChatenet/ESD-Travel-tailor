import { FC, Dispatch, SetStateAction } from "react";
import { CommentToolbar } from "@/components/traveler/travels/activity/comments/toolBar";

interface IProps {
    setDisplayCommentModule: Dispatch<SetStateAction<boolean>>;
}

export const CommentModule: FC<IProps> = ({ setDisplayCommentModule }) => {
    return (
        <>
        <CommentToolbar setDisplayCommentModule={setDisplayCommentModule} />
        <section className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
            Comments
        </section>
        </>
    );
};