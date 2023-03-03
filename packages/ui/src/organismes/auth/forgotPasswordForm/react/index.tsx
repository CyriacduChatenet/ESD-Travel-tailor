import { AuthService } from '@travel-tailor/services';
import { ForgotPasswordDTO } from '@travel-tailor/types';
import { FC, FormEvent, useState } from 'react';

export const WebForgotPasswordForm: FC = () => {
	const [credentials, setCredentials] = useState<ForgotPasswordDTO>({
		email: '',
	});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        return AuthService.forgotPassword(credentials);
    };

	return (
		<form action="" onSubmit={handleSubmit}>
			<label htmlFor="">
				<span>Email</span>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={handleChange}
				/>
			</label>
			<input type="submit" value={'forgot password'} />
		</form>
	);
};
