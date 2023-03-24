import { CommentService } from "@travel-tailor/services";
import { useUser } from "@travel-tailor/contexts";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

interface IProps {
    api_url: string;
    activity_id: string;
    setComments: Dispatch<SetStateAction<any>>
}

export const WebCommentForm: FC<IProps> = ({ api_url, activity_id, setComments }) => {
    const [credentials, setCredentials] = useState<{ content: string }>({
        content: "",
    });

    const { user } = useUser();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = CommentService.createCommentWithRelations(api_url, {content: credentials.content, traveler: user.traveler?.id }, activity_id);
        setComments((prevComments: Comment[]) => [...prevComments, comment])
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <textarea name="content" placeholder="Comment" onChange={handleChange} id="" cols={30} rows={10}></textarea>
            <input type="submit" value="Send" />
        </form>
    );
};