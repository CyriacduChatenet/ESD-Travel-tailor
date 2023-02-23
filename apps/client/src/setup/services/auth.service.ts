import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from '@travel-manager/functions';
import { useFetchHook } from '@travel-manager/hooks';
import { SignupDTO, SigninDTO, ForgotPasswordDTO, ResetPasswordServiceDTO, ErrorResponse } from "@travel-manager/types";

import { TokenService } from '@/setup/services/token.service';
import { TravelerService } from '@/setup/services/traveler.service';
import { UserService } from '@/setup/services/user.service';
import { ROLES, TOKENS } from '@/setup/constants';
import { create } from '@/setup/redux/slices/user/user.slice';
import { changeId } from '../redux/slices/auth/signup.slice';

export class AuthService {
	useFetch = new useFetchHook();
	tokenService = new TokenService();
	travelerService = new TravelerService();
	userService = new UserService();
	dispatch = useDispatch();

	public async signup(credentials: SignupDTO, setErrorState: Dispatch<SetStateAction<ErrorResponse>>) {
		const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/signup`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(credentials),
		});
		const responseUserJSON = await response.json();

		if (responseUserJSON.status >= 400) {
			setErrorState(responseUserJSON);
		}

		this.dispatch(changeId(responseUserJSON.id));
		this.dispatch(create(responseUserJSON));

		if (responseUserJSON.roles === ROLES.TRAVELER) {
			const responseTravelerJSON = await this.travelerService.create();

			const userId = responseUserJSON.id;
			const travelerId = responseTravelerJSON.id satisfies string;

			const travelerQuery = {
				user: userId,
			};

			this.userService.update(userId, travelerId);
			this.travelerService.update(travelerId, travelerQuery);
		}
	}

	public async signin(credentials: SigninDTO, setErrorState: Dispatch<SetStateAction<ErrorResponse>>) {
		const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/signin`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(credentials),
		});
		const responseJSON = await response.json();

		if (!responseJSON.access_token) {
			setErrorState(responseJSON);
		}

		if (responseJSON.statusCode !== 401) {
			this.tokenService.create(TOKENS.ACCESS_TOKEN, responseJSON.access_token);
		}
	}

	public async forgotPassword(credentials: ForgotPasswordDTO) {
		const resetToken = this.useFetch.post(`${import.meta.env.VITE_APP_API_URL}/auth/forgot-password/`, credentials);
		return this.tokenService.create(TOKENS.RESET_TOKEN, await resetToken);
	}

	public async resetPassword(credentials: ResetPasswordServiceDTO) {
		const resetToken = this.useFetch.post(`${import.meta.env.VITE_APP_API_URL}/auth/reset-password/${credentials.token}`, credentials);
		return this.tokenService.create(TOKENS.RESET_TOKEN, await resetToken);
	}
}
