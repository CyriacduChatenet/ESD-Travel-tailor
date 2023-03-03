import { ROUTES, SIGNIN_TOKEN } from '@travel-tailor/constants';
import { TasteService, TokenService, TravelerService } from '@travel-tailor/services';
import { CreateTasteDTO } from '@travel-tailor/types';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

interface IProps {
	api_url: string;
}

export const WebCreateTasteForm: FC<IProps> = ({ api_url }) => {
	const router = useRouter();

	const userId = router.query.id;

	const [credentials, setCredentials] = useState<CreateTasteDTO>({
		name: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const taste = await TasteService.createTaste(`${api_url}/taste`,credentials);
		await TravelerService.updateTraveler(String(userId), { tastes: [`${taste.id}`] });
		TokenService.removeSigninToken();
		return router.push(ROUTES.SIGNIN);
	};

	return (
		<form action="" onSubmit={handleSubmit}>
			<label htmlFor="">
				<span>Name</span>
				<input type="text" placeholder="Name" name="name" onChange={handleChange} />
			</label>
			<input type="submit" value="Create taste" />
		</form>
	);
};
