import { Router } from 'express';

import adminAPI from './admin';
import categoryAPI from './category';
import sizeAPI from './size';
import colorAPI from './color';
import productAPI from './product';

export default () => {
	const router = Router();
	
	adminAPI(router);
	categoryAPI(router);
	sizeAPI(router);
	colorAPI(router);
	productAPI(router);

	return router;
}