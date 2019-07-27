import routes from 'config/routes';

import { adminRegistration } from 'services';

export default router => {

	const { adminApi } = routes;

	router.post(
		adminApi.registration.url,
		adminRegistration
	);
	  
};