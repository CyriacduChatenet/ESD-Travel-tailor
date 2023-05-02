import { ActivityTagService } from "@travel-tailor/services";
import { ActivityTag, CreateActivityTagDTO } from "@travel-tailor/types";
import { ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction, useMemo, useState } from "react";

interface IProps {
    api_url: string;
    tags: ActivityTag[];
    setTags: Dispatch<SetStateAction<ActivityTag[]>>;
}

export const WebTagInput: FC<IProps> = ({ tags, setTags, api_url}) => {
    const [activityTagCredentials, setActivityTagCredentials] = useState<CreateActivityTagDTO>({
        name: '',
        activities: []
      })
    
    const [searchResults, setSearchResults] = useState<ActivityTag[]>([])
    const [selectedResult, setSelectedResult] = useState<ActivityTag>({
        id: '',
        name: '',
        activities: []
    });

    const [submitError, setSubmitError] = useState({});

    const [hideAutocomplete, setHideAutocomplete] = useState(true);

    const handleCreateTag = async () => {
        return setTags([...tags, await ActivityTagService.createActivityTag(api_url, activityTagCredentials, setSubmitError)])
      };

      const handleActivityTag = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const { name, value } = e.target
        setActivityTagCredentials({ ...activityTagCredentials, [name]: value })
      }

      const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleCreateTag();
      };

      const handleSelected = (tag: ActivityTag) => {
        setActivityTagCredentials({ ...activityTagCredentials, name: '' })
        setSelectedResult(tag);
        return setTags([...tags, selectedResult])
      };

      useMemo(async () => {
        const response = await ActivityTagService.findAllActivityTags(api_url, `?name=${activityTagCredentials.name}`, setSubmitError);
        setSearchResults(response);
      }, [activityTagCredentials]);

    return (
        <label htmlFor="" onMouseEnter={() => setHideAutocomplete(!hideAutocomplete)} onMouseLeave={() => setHideAutocomplete(!hideAutocomplete)}>
        <p>Tags</p>
        <input type="text" name="name" value={activityTagCredentials.name} placeholder="tag name" id="create-tag-input" onChange={handleActivityTag} />
        {!hideAutocomplete ? searchResults.map((tag: ActivityTag) => <div key={tag.id}>
          <p onClick={() => handleSelected(tag)}>{tag.name}</p>
        </div>) : null}
        <button onClick={handleClick} id="add-tag-btn">Add tag</button>
      </label>
    );
};