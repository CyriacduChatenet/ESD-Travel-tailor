import { OBJECT_KEYS, ROUTES } from "@travel-tailor/constants";
import { useUser } from "@travel-tailor/contexts";
import { TravelService } from "@travel-tailor/services";
import { UpdateTravelDTO } from "@travel-tailor/types";
import { FC, useState, useRouter } from "@travel-tailor/functions";

import { WebLocationInput } from "../../../atoms/location-input/react";

interface IProps {
    api_url: string;
    mapboxAccessToken: string;
    travel_id: string;
};

export const WebUpdateTravelForm: FC<IProps> = ({ api_url, mapboxAccessToken, travel_id }) => {
    const { user } = useUser();
    const router = useRouter();
    const [credentials, setCredentials] = useState<UpdateTravelDTO>({
        departureDate: new Date(),
        returnDate: new Date(),
        traveler: user?.traveler?.id
    });

    const [cities, setCities] = useState<UpdateTravelDTO>({
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
        await TravelService.updateTravel(api_url, `${router.query.id}`, {departureCity: cities.departureCity, destinationCity: cities.destinationCity, departureDate: credentials.departureDate, returnDate: credentials.returnDate});
        return router.push(ROUTES.TRAVELER.DASHBOARD)
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
            <input type="submit" value={'update travel'} />
        </form>
    );
};