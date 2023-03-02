import { useFetch } from '@travel-tailor/hooks';

const getHello = () => {
	return useFetch.get(`http://localhost:8000/api/v1`);
};

export const HelloService = {
	getHello,
};
