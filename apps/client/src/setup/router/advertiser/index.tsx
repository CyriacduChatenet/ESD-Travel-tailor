import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Role } from '@travel-manager/functions';

import { CreateAdvertiserPage } from '@/app/pages/advertiser/createAdvertiser';
import { AdvertiserDashboardPage } from '@/app/pages/advertiser/dashboard';
import { CreateAdvertPage } from '@/app/pages/advertiser/advert/createAdvert';
import { EditAdvertPage } from '@/app/pages/advertiser/advert/editAdvert';
import { ROUTES } from '@/setup/constants';
import { PrivateRoutes } from '@/setup/router/private';

export const AdvertiserRouter: FC = () => {
	return (
		<Routes>
			<Route element={<PrivateRoutes role={Role.Advertiser} />}>
				<Route path={ROUTES.ADVERTISER.CREATE} element={<CreateAdvertiserPage />} />
				<Route path={ROUTES.ADVERTISER.DASHBOARD} element={<AdvertiserDashboardPage />} />
				<Route path={ROUTES.ADVERTISER.ADVERT.CREATE} element={<CreateAdvertPage />} />
				<Route path={ROUTES.ADVERTISER.ADVERT.UPDATE} element={<EditAdvertPage />} />
			</Route>
		</Routes>
	);
};
