import { CommentService } from "@travel-tailor/services";
import { useUser } from "@travel-tailor/contexts";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "@travel-tailor/functions";
import { WebInputLabel } from "../../../atoms/input-label/react";
import { WebStar } from "../../../atoms/star/react";

import styles from './style.module.scss';

interface IProps {
    api_url: string;
    activity_id: string;
    setComments: Dispatch<SetStateAction<any>>
}

export const WebCommentForm: FC<IProps> = ({ api_url, activity_id, setComments }) => {
    const [credentials, setCredentials] = useState<{ content: string }>({
        content: "",
    });

    const [submitError, setSubmitError] = useState({});

    const [mark, setMark] = useState<number>(0);

    const { user } = useUser();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = CommentService.createCommentWithRelations(api_url, {content: credentials.content, traveler: user.traveler?.id, mark }, activity_id, setSubmitError);
        setComments((prevComments: Comment[]) => [...prevComments, comment])
    };
    
    return (
        <form onSubmit={handleSubmit} id="comment-form">
            <div className={styles.stars}>
                <WebInputLabel type={"radio"} name={"mark"} value={1} onChange={() => setMark(1)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-1"/>
                <WebInputLabel type={"radio"} name={"mark"} value={2} onChange={() => setMark(2)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-2"/>
                <WebInputLabel type={"radio"} name={"mark"} value={3} onChange={() => setMark(3)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-3"/>
                <WebInputLabel type={"radio"} name={"mark"} value={4} onChange={() => setMark(4)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-4"/>
                <WebInputLabel type={"radio"} name={"mark"} value={5} onChange={() => setMark(5)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-5"/>
                <WebInputLabel type={"radio"} name={"mark"} value={6} onChange={() => setMark(6)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-6"/>
                <WebInputLabel type={"radio"} name={"mark"} value={7} onChange={() => setMark(7)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-7"/>
                <WebInputLabel type={"radio"} name={"mark"} value={8} onChange={() => setMark(8)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-8"/>
                <WebInputLabel type={"radio"} name={"mark"} value={9} onChange={() => setMark(9)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-9"/>
                <WebInputLabel type={"radio"} name={"mark"} value={10} onChange={() => setMark(10)} customLabel={<WebStar/>} style={{ display: "none" }} className="star-10"/>
            </div>
            <textarea name="content" placeholder="Comment" onChange={handleChange} id="comment-input" cols={30} rows={10}></textarea>
            <input type="submit" value="Send" />
        </form>
    );
};