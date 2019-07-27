import routes from 'config/routes';

import { checkValue, handleMissedParamsError } from 'globals/helpers';

export default (req, res, next) => {
	const routeBodyParams = Object.values(routes.adminApi).find(({url, bodyParams}) => req.originalUrl === url && bodyParams);

	if(!routeBodyParams) {
		next();
	}
	else{
		const missedParams = routeBodyParams.bodyParams.filter(param => !checkValue(req.body[param]));

		missedParams.length > 0 ? res.status(406).send({message: handleMissedParamsError(missedParams)}) : next();
	}	
};