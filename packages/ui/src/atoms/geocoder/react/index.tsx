import React, { Dispatch, SetStateAction, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import { GeocoderService } from "@travel-tailor/services";

interface Props {
  setResults: Dispatch<SetStateAction<mapboxgl.MapboxGeoJSONFeature[]>>;
  accessToken: string;
  geocoderQuery: string;
  setGeocoderQuery: Dispatch<SetStateAction<string>>;
}

const Geocoder: React.FC<Props> = ({ setResults, accessToken, geocoderQuery, setGeocoderQuery }) => {
    mapboxgl.accessToken = accessToken;;

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGeocoderQuery(event.target.value);
  };

  useMemo(async () => {
    await GeocoderService.searchCity(geocoderQuery, accessToken, setResults);
  }, [geocoderQuery]);

  return (
    <div>
      <input type="text" value={geocoderQuery} placeholder="location" onChange={handleQueryChange} />
    </div>
  );
};

export default Geocoder;