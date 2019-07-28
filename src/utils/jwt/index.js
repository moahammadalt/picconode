import util from 'util';
import jwt from 'jsonwebtoken';

import config from 'config';

export default new class JWT{

	sign(payload){
		return jwt.sign(payload, config.JWT.privateKey, config.JWT.signOptions);
	}

	verify(token){
		return jwt.verify(token, config.JWT.publicKey, config.JWT.verifyOptions);
	}
}