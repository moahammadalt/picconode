import { Router } from 'express';

import adminAPI from './admin';
import productAPI from './product';
import categoryAPI from './category';

export default () => {
	const router = Router();
	
	adminAPI(router);
	productAPI(router);
	categoryAPI(router);

	return router;
}