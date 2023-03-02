import { ChangeEvent, FC, useState } from 'react';
import { AuthService } from '@travel-tailor/services';
import { SigninDTO } from '@travel-tailor/types';

export const WebSigninForm: FC = () => {
	const [credentials, setCredentials] = useState<SigninDTO>({
		email: '',
		password: '',
	});

	const handleSubmit = () => {
		return AuthService.signin(credentials);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	return (
		<form action="" onSubmit={(e) => {
			e.preventDefault();
			handleSubmit();
		}}>
			<label htmlFor="">
				<span>Email</span>
				<input type="email" placeholder="Email" name="email" onChange={handleChange} />
			</label>
			<label htmlFor="">
				<span>Password</span>
				<input type="password" placeholder="Password" name="password" onChange={handleChange} />
			</label>
			<input type="submit" value={'Signin'} />
		</form>
	);
};
