import { useFetch } from '@travel-tailor/hooks';
import dotenv from 'dotenv';

dotenv.config();

const getHello = () => {
	return useFetch.get(`${process.env.API_URL}`);
};

export const HelloService = {
	getHello,
};
