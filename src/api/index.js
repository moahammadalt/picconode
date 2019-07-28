import { Router } from 'express';

import adminAPI from './adminAPI';
import productAPI from './productAPI';

export default () => {
	const router = Router();
	
	adminAPI(router);
	productAPI(router);

	return router;
}