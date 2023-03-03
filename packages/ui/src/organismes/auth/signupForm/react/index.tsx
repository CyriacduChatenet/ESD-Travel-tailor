import { ROLES, ROUTES } from '@travel-tailor/constants';
import { AuthService, TravelerService, UserService } from '@travel-tailor/services';
import { SignupDTO } from '@travel-tailor/types';
import { useRouter } from 'next/router';
import { FC, FormEvent, useState } from 'react';

export const WebSignupForm: FC = () => {
	const [credentials, setCredentials] = useState<SignupDTO>({
		username: '',
		email: '',
		password: '',
		roles: '',
	});

	const router = useRouter();

	const handleRedirect = async (user: any) => {
		if (credentials.roles === ROLES.ADMIN) {
			router.push(ROUTES.SIGNIN);
		} else if (credentials.roles === ROLES.TRAVELER) {
			const traveler = await TravelerService.createTraveler({
				user: user.id,
			});
			await UserService.updateUser(user.id, { traveler: traveler.id });
			router.push(ROUTES.SIGNIN);
		} else if (credentials.roles === ROLES.ADVERTISER) {
			router.push(`${ROUTES.ADVERTISER.CREATE_ADVERTISER}/${user.id}`);
		}
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = await AuthService.signup(credentials);
		handleRedirect(user);
	};

	return (
		<form action="" onSubmit={handleSubmit}>
			<label htmlFor="">
				<span>Username</span>
				<input type="text" placeholder="Username" name="username" onChange={handleChange} />
			</label>
			<label htmlFor="">
				<span>Email</span>
				<input type="email" placeholder="Email" name="email" onChange={handleChange} />
			</label>
			<label htmlFor="">
				<span>Password</span>
				<input type="password" placeholder="Password" name="password" onChange={handleChange} />
			</label>
			<label htmlFor="">
				<span>Roles</span>
				<select name="roles" onChange={handleChange}>
					<option value="">select role</option>
					<option value="traveler">Traveler</option>
					<option value="advertiser">Advertiser</option>
				</select>
			</label>
			<input type="submit" value={'Signup'} />
		</form>
	);
};
