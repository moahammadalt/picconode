import config from 'config';
import JWT from "utils/jwt";
import { responseStatuses } from 'globals/constants';

// TODO: add refresh token or at least invalid old token when user loged in again
export default async (req, res, next) => {

	if(req.path === '/register' || req.path === '/register/' || req.path === '/login' || req.path === '/login/') {
		next();
		return;
	}
	
	const invalidTokenError = {
		status: responseStatuses.fail,
		errorMessage: 'authentication failed',
	}
	
	const token = req.headers['authorization'];

	if(!token) {
		res.status(403).send(invalidTokenError);
		return;
	}

	try {
		const decoded = await JWT.verify(token, config.JWT.publicKey, config.JWT.verifyOptions);
		req['adminUser'] = decoded;
		next();
	}
	catch (err) {
		res.status(403).send(invalidTokenError);
	}
};