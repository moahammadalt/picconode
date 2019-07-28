import routes from 'config/routes';

import { productCreate } from 'services';

export default router => {

	const { adminApi } = routes;

	router.post(
		adminApi.productCreate.url,
		productCreate
	);
	  
};