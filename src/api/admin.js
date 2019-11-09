import { adminRegistration, adminLogin, adminDashboardRetrive } from 'services';

import routes from 'config/routes';
import { serviceHandler } from 'utils/service';

export default router => {

	const { adminApi } = routes;

	router.post(
		adminApi.registration.url,
		(...arg) => { serviceHandler(...arg, adminRegistration) }
	);

	router.post(
		adminApi.login.url,
		(...arg) => { serviceHandler(...arg, adminLogin) }
	);

	router.get(
		adminApi.dashboardRetrive.url,
		(...arg) => { serviceHandler(...arg, adminDashboardRetrive) }
	);
	  
};