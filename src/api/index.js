import { Router } from 'express';

import adminApi from './routes/adminAPI';

export default () => {
	const router = Router();
	
	adminApi(router);

	return router;
}