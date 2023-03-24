import { Dispatch, SetStateAction } from "react";
import mapboxgl from "mapbox-gl";

const searchCity = async (geocoderQuery: string, mapboxAccessToken: string, setResultSelected: Dispatch<SetStateAction<mapboxgl.MapboxGeoJSONFeature[]>>) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        geocoderQuery
      )}.json?access_token=${mapboxAccessToken}`;
      const response = await fetch(url);
      const data = await response.json();
      setResultSelected(data.features);
};

export const GeocoderService = {
    searchCity,
};