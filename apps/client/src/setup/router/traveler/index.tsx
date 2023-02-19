import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Role } from '@travel-manager/functions';

import { TravelerDashboardPage } from '@/app/pages/traveler/dashboard';
import { ROUTES } from '@/setup/constants';
import { PrivateRoutes } from '@/setup/router/private';

export const TravelerRouter: FC = () => {
	return (
		<Routes>
			<Route element={<PrivateRoutes role={Role.Traveler} />}>
				<Route path={ROUTES.TRAVELER.DASHBOARD} element={<TravelerDashboardPage />} />
			</Route>
		</Routes>
	);
};
