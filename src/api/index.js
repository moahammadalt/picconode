import { Router } from 'express';

import adminAPI from './admin';
import categoryAPI from './category';
import sizeAPI from './size';
import colorAPI from './color';
import productAPI from './product';
import userDemandAPI from './userDemand';
import emailSubscriptionAPI from './emailSubscription';
import emailUserAPI from './emailUser';
import viewAPI from './view';

export default () => {
	const router = Router();
	
	viewAPI(router);
	adminAPI(router);
	categoryAPI(router);
	sizeAPI(router);
	colorAPI(router);
	productAPI(router);
	userDemandAPI(router);
	emailSubscriptionAPI(router);
	emailUserAPI(router);
	
	return router;
}