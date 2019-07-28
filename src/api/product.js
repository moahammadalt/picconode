import { productCreate } from 'services';

import routes from 'config/routes';
import { serviceHandler } from 'utils/service';


export default router => {

	const { adminApi } = routes;

	router.post(
		adminApi.productCreate.url,
		(...arg) => { serviceHandler(...arg, productCreate) }
	);
	  
};