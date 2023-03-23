import { OBJECT_KEYS } from "@travel-tailor/constants";
import { useUser } from "@travel-tailor/contexts";
import { TravelService } from "@travel-tailor/services";
import { CreateTravelDTO } from "@travel-tailor/types";
import { FC, useState } from "react";
import { WebLocationInput } from "../../../../../atoms/location-input/react";

interface IProps {
    api_url: string;
    mapboxAccessToken: string;
};

export const WebCreateTravelForm: FC<IProps> = ({ api_url, mapboxAccessToken }) => {
    const { user } = useUser();
    const [credentials, setCredentials] = useState<CreateTravelDTO>({
        departureDate: new Date(),
        returnDate: new Date(),
        traveler: user?.traveler?.id
    });

    const [cities, setCities] = useState<CreateTravelDTO>({
        departureCity: '',
        destinationCity: '',
      })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await TravelService.createTravel(api_url, {...credentials, ...cities});
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                <p>Departure city</p>
                <WebLocationInput mapboxAccessToken={mapboxAccessToken} setStateCredentials={setCities} stateCredentials={cities} objectKey={OBJECT_KEYS.DEPARTURE_CITY}/>
            </label>
            <label htmlFor="">
                <p>Destination city</p>
                <WebLocationInput mapboxAccessToken={mapboxAccessToken} setStateCredentials={setCities} stateCredentials={cities} objectKey={OBJECT_KEYS.DESTINATION_CITY}/>
            </label>
            <label htmlFor="">
                <p>Departure date</p>
                <input type="date" name="departureDate" placeholder="Departure date" onChange={handleChange} />
            </label>
            <label htmlFor="">
                <p>Return date</p>
                <input type="date" name="returnDate" placeholder="Return date" onChange={handleChange} />
            </label>
            <br />
            <br />
            <input type="submit" value={'create travel'} />
        </form>
    );
};