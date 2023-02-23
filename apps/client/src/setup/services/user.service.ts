import { useDispatch, useSelector } from '@travel-manager/functions';
import { SignupDTO } from '@travel-manager/types';

import { findAll, findOne, create, update, remove, selectUsers } from '@/setup/redux/slices/user/user.slice';

export class UserService {
	dispatch = useDispatch();
	userss = useSelector(selectUsers);

	public async findAll() {
		try {
			const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user`);
			const responseJSON = await response.json();
			this.dispatch(findAll(responseJSON));
		} catch (err) {
			console.error(err);
		}
	}

	public async findOne(email: string) {
		try {
			const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${email}`);
			const responseJSON = await response.json();
			this.dispatch(findOne(email));
			return responseJSON;
		} catch (err) {
			console.error(err);
		}
	}

	public async create(credentials: SignupDTO) {
		try {
			const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify(credentials),
			});
			const responseJSON = await response.json();
			this.dispatch(create(responseJSON));
		} catch (err) {
			console.error(err);
		}
	}

	public async update(
		id: string,
		credentials: { email: string; password: string; username: string; traveler: string; resetPasswordToken: string }
	) {
		try {
			const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'PATCH',
				body: JSON.stringify(credentials),
			});
			const responseJSON = await response.json();
			this.dispatch(update({ id, responseJSON }));
		} catch (err) {
			console.error(err);
		}
	}

	public async delete(id: string) {
		try {
			const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			});
			const responseJSON = await response.json();
			this.dispatch(remove(id));
            return responseJSON;
		} catch (err) {
			console.error(err);
		}
	}
}
