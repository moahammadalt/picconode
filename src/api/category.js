import routes from 'config/routes';
import { serviceHandler } from 'utils/service';

import { categoryCreate, categoryList } from 'services';

export default router => {

	const { adminApi } = routes;

	router.post(
		adminApi.categoryCreate.url,
		(...arg) => { serviceHandler(...arg, categoryCreate) }
	);

	router.get(
		adminApi.categoryList.url,
		(...arg) => { serviceHandler(...arg, categoryList) }
	);

};