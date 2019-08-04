import { Router } from 'express';

import adminAPI from './admin';
import categoryAPI from './category';
import sizeAPI from './size';
import colorAPI from './color';
import productAPI from './product';
import viewAPI from './view';

export default () => {
	const router = Router();
	
	adminAPI(router);
	categoryAPI(router);
	sizeAPI(router);
	colorAPI(router);
	productAPI(router);
	viewAPI(router);

	return router;
}