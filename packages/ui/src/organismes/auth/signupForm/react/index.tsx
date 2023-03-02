import { AuthService } from '@travel-tailor/services';
import { SignupDTO } from '@travel-tailor/types';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

export const WebSignupForm: FC = () => {
	const [credentials, setCredentials] = useState<SignupDTO>({
		username: '',
		email: '',
		password: '',
		roles: '',
	});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return AuthService.signup(credentials);
    };

	return (
		<form action="" onSubmit={handleSubmit}>
			<label htmlFor="">
				<span>Username</span>
				<input
					type="text"
					placeholder="Username"
					name="username"
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="">
				<span>Email</span>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
				/>
			</label>
			<label htmlFor="">
				<span>Password</span>
				<input
					type="password"
					placeholder="Password"
					name="password"
                    onChange={handleChange}
				/>
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
