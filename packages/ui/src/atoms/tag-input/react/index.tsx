import { ActivityTagService } from "@travel-tailor/services";
import { ActivityTag, CreateActivityTagDTO } from "@travel-tailor/types";
import { ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction, useMemo, useState } from "react";

interface IProps {
    api_url: string;
    tags: any[];
    setTags: Dispatch<SetStateAction<any[]>>;
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

    const handleCreateTag = async () => {
        return setTags([...tags, await ActivityTagService.createActivityTag(api_url, activityTagCredentials)])
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
        const response = await ActivityTagService.findAllActivityTags(api_url, `?name=${activityTagCredentials.name}`);
        setSearchResults(response);
      }, [activityTagCredentials]);

    return (
        <label htmlFor="">
        <p>Tags</p>
        <input type="text" name="name" value={activityTagCredentials.name} placeholder="tag name" onChange={handleActivityTag} />
        {searchResults.map((tag: ActivityTag) => <div key={tag.id}>
          <p onClick={() => handleSelected(tag)}>{tag.name}</p>
        </div>)}
        <button onClick={handleClick}>Add tag</button>
      </label>
    );
};