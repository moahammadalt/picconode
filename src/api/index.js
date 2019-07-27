import { Router } from 'express';

import adminApi from './adminAPI';

export default () => {
	const router = Router();
	
	adminApi(router);

	return router;
}