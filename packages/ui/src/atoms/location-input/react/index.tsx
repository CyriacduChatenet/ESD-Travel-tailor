import { CreateActivityDetailDTO } from "@travel-tailor/types";
import { Dispatch, FC, SetStateAction, useState } from "react";
import mapboxgl from "mapbox-gl";

import Geocoder from "../../geocoder/react";

interface IProps {
    mapboxAccessToken: string
    setActivityDetailCredentials: Dispatch<SetStateAction<CreateActivityDetailDTO>>
    activityDetailCredentials: CreateActivityDetailDTO
};

export const WebLocationInput:FC<IProps> = ({ mapboxAccessToken, setActivityDetailCredentials, activityDetailCredentials }) => {
    const [results, setResults] = useState<mapboxgl.MapboxGeoJSONFeature[]>([]);
    const [hideAutocomplete, setHideAutocomplete] = useState(true);
    const [geocoderQuery, setGeocoderQuery] = useState('');

    const handleCredentials = (value: string) => {
        setActivityDetailCredentials({ ...activityDetailCredentials, location: value })
        setGeocoderQuery(value);
    };

    return (
        <div onMouseEnter={() => setHideAutocomplete(!hideAutocomplete)} onMouseLeave={() => setHideAutocomplete(!hideAutocomplete)}>
        <Geocoder setResults={setResults} accessToken={mapboxAccessToken} geocoderQuery={geocoderQuery} setGeocoderQuery={setGeocoderQuery} />
        <ul>
          {!hideAutocomplete ? results.map((result: any) => (
            <li key={result.id} onClick={() => handleCredentials(result.place_name)}>{result.place_name}</li>
          )) : null}
        </ul>
      </div>
    );
}