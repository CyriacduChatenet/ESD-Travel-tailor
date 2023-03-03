import { ROUTES } from '@travel-tailor/constants';
import { AdvertiserService, UserService } from '@travel-tailor/services';
import { CreateAdvertiserDTO } from '@travel-tailor/types';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

export const WebCreateAdvertiserForm: FC = () => {
	const router = useRouter();

	const userId = router.query.id;

	const [credentials, setCredentials] = useState<CreateAdvertiserDTO>({
		name: '',
		location: '',
		user: String(userId),
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        const advertiser = await AdvertiserService.createAdvertiser(credentials);
		await UserService.updateUser(String(userId), { advertiser: advertiser.id });
		return router.push(ROUTES.SIGNIN);
	};
    
	return (
		<form action="" onSubmit={handleSubmit}>
			<label htmlFor="">
				<span>Name</span>
				<input type="text" placeholder="Name" name="name" onChange={handleChange} />
			</label>
			<label htmlFor="">
				<span>Location</span>
				<input type="text" placeholder="Location" name="location" onChange={handleChange} />
			</label>
			<input type="submit" value="Create advertiser" />
		</form>
	);
};
