import { CommentService } from "@travel-tailor/services";
import { useUser } from "@travel-tailor/contexts";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "@travel-tailor/functions";

interface IProps {
    api_url: string;
    activity_id: string;
    setComments: Dispatch<SetStateAction<any>>
}

export const WebCommentForm: FC<IProps> = ({ api_url, activity_id, setComments }) => {
    const [credentials, setCredentials] = useState<{ content: string }>({
        content: "",
    });

    const [mark, setMark] = useState<number>(0);

    const { user } = useUser();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const comment = CommentService.createCommentWithRelations(api_url, {content: credentials.content, traveler: user.traveler?.id, mark }, activity_id);
        setComments((prevComments: Comment[]) => [...prevComments, comment])
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <input type="radio" name="mark" value="1" onChange={() => setMark(1)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="2" onChange={() => setMark(2)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="3" onChange={() => setMark(3)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="4" onChange={() => setMark(4)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="5" onChange={() => setMark(5)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="6" onChange={() => setMark(6)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="7" onChange={() => setMark(7)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="8" onChange={() => setMark(8)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="9" onChange={() => setMark(9)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
                <label>
                    <input type="radio" name="mark" value="10" onChange={() => setMark(10)} style={{ display: "none" }} />
                    <span style={{ display: "inline-block", position: "relative", width: "1.5em", height: "1.5em" }}>
                        <svg viewBox="0 0 24 24" style={{ width: "100%", height: "100%", fill: "currentColor" }}>
                        <path d="M12 1.125L8.52 7.794L0.443 8.953L6.16 14.229L4.527 22.407L12 18.262L19.473 22.407L17.84 14.229L23.557 8.953L15.48 7.794L12 1.125Z" />
                        </svg>
                    </span>
                </label>
            </div>
            <textarea name="content" placeholder="Comment" onChange={handleChange} id="" cols={30} rows={10}></textarea>
            <input type="submit" value="Send" />
        </form>
    );
};