import { useUser } from "@travel-tailor/contexts";
import { TravelService } from "@travel-tailor/services";
import { CreateTravelDTO } from "@travel-tailor/types";
import { FC, useState } from "react";

interface IProps {
    api_url: string;
};

export const WebTravelForm: FC<IProps> = ({ api_url }) => {
    const { user } = useUser();
    const [credentials, setCredentials] = useState<CreateTravelDTO>({
        departureCity: '',
        destinationCity: '',
        departureDate: new Date(),
        returnDate: new Date(),
        traveler: user?.traveler?.id
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await TravelService.createTravel(api_url, credentials);
    };

    return (
        <form action="" onSubmit={handleSubmit}>
            <label htmlFor="">
                <p>Departure city</p>
                <input type="text" name="departureCity" placeholder="Departure city" onChange={handleChange} />
            </label>
            <label htmlFor="">
                <p>Destination city</p>
                <input type="text" name="destinationCity" placeholder="Destination city" onChange={handleChange} />
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