import { OBJECT_KEYS } from "@travel-tailor/constants";
import { useUser } from "@travel-tailor/contexts";
import { TravelService } from "@travel-tailor/services";
import { CreateTravelDTO } from "@travel-tailor/types";
import { FC, useState } from "@travel-tailor/functions";

import { WebLocationInput } from "../../../atoms/location-input/react";
import { WebInputLabel } from "../../../atoms/input-label/react";

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
    
    const [errors, setErrors] = useState<Partial<CreateTravelDTO>>({
        departureDate: '',
        returnDate: '',
        departureCity: '',
        destinationCity: '',
    });

    const [submitError, setSubmitError] = useState({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const validate = (credentials: Partial<CreateTravelDTO>, cities: Partial<CreateTravelDTO>) => {
        if (!credentials.departureDate) {
            setErrors({ ...errors, departureDate: 'Departure date is required' });
            return false;
        }
        if (!credentials.returnDate) {
            setErrors({ ...errors, returnDate: 'Return date is required' });
            return false;
        }
        if (!cities.departureCity) {
            setErrors({ ...errors, departureCity: 'Departure city is required' });
            return false;
        }
        if (!cities.destinationCity) {
            setErrors({ ...errors, destinationCity: 'Destination city is required' });
            return false;
        }
        return true;  
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const error = validate(credentials, cities);

        if(error) {
            await TravelService.createTravel(api_url, {...credentials, ...cities}, setSubmitError);
        }
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                <p>Departure city</p>
                <WebLocationInput mapboxAccessToken={mapboxAccessToken} setStateCredentials={setCities} stateCredentials={cities} objectKey={OBJECT_KEYS.DEPARTURE_CITY} error={`${errors.departureCity}`}/>
            </label>
            <label htmlFor="">
                <p>Destination city</p>
                <WebLocationInput mapboxAccessToken={mapboxAccessToken} setStateCredentials={setCities} stateCredentials={cities} objectKey={OBJECT_KEYS.DESTINATION_CITY} error={`${errors.destinationCity}`}/>
            </label>
            <WebInputLabel type={"date"} name={"departureDate"}  placeholder={"Departure date"} onChange={() => handleChange} error={errors.departureDate}/>
            <WebInputLabel type={"date"} name={"returnDate"}  placeholder={"Return date"} onChange={() => handleChange} error={errors.returnDate}/>
            <br />
            <br />
            <input type="submit" value={'create travel'} />
        </form>
    );
};