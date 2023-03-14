import { CommentService } from "@travel-tailor/services";
import { Activity } from "@travel-tailor/types";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

interface IProps {
    api_url: string;
    activity_id: string;
    data: Activity,
    setData: Dispatch<SetStateAction<Activity>>
}

export const WebCommentForm: FC<IProps> = ({ api_url, activity_id, setData, data }) => {
    const [credentials, setCredentials] = useState<{ content: string }>({
        content: "",
    });
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = await CommentService.createCommentWithRelations(api_url, {content: credentials.content}, activity_id);
        setData({...data, comments: [...data.comments, comment]})
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <textarea name="content" placeholder="Comment" onChange={handleChange} id="" cols={30} rows={10}></textarea>
            <input type="submit" value="Send" />
        </form>
    );
};