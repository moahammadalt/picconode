import routes from 'config/routes';

import { adminRegistration, adminLogin } from 'services';

export default router => {

	const { adminApi } = routes;

	router.post(
		adminApi.registration.url,
		adminRegistration
	);

	router.post(
		adminApi.login.url,
		adminLogin
	);
	  
};