import { CreateActivityDetailDTO } from "@travel-tailor/types";
import { Dispatch, FC, SetStateAction, useState } from "react";

import Geocoder from "../../geocoder/react";

interface IProps {
    mapboxAccessToken: string
    setActivityDetailCredentials: Dispatch<SetStateAction<CreateActivityDetailDTO>>
    activityDetailCredentials: CreateActivityDetailDTO
};

export const WebLocationInput:FC<IProps> = ({ mapboxAccessToken, setActivityDetailCredentials, activityDetailCredentials }) => {
    const [results, setResults] = useState([]);

    const handleResultSelected = (result: any) => {
      setResults(result);
    };

    const handleCredentials = (value: string) => {
        setActivityDetailCredentials({ ...activityDetailCredentials, location: value })
    };

    return (
        <div>
        <Geocoder onResultSelected={handleResultSelected} accessToken={mapboxAccessToken} />
        <ul>
          {results.map((result: any) => (
            <li key={result.id} onClick={() => handleCredentials(result.place_name)}>{result.place_name}</li>
          ))}
        </ul>
      </div>
    );
}