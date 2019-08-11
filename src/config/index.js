require('dotenv').config();
import path from 'path';
import fs from 'fs';

export default {
	PORT: process.env.PORT,
	ADMIN: {
		userName: process.env.ADMIN_USER_NAME,
		password: process.env.ADMIN_PASSWORD,
	},
	DB: {
		host: process.env.DATABASE_HOST,
		name: process.env.DATABASE_NAME,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
	},
	JWT: {
		privateKey: fs.readFileSync(path.join(path.resolve('.'), '/src/config/keys/JWTPrivate.key'), 'utf8'),
		publicKey: fs.readFileSync(path.join(path.resolve('.'), '/src/config/keys/JWTPublic.key'), 'utf8'),
		signOptions: {
			algorithm: process.env.JWT_ALGORITHM,
			expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME
		},
		verifyOptions: {
			algorithm: [process.env.JWT_ALGORITHM],
			expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME
		}
	},
	PUBLIC_VIEW_PATH: '/src/views/',
	PUBLIC_IMAGES_PATH: '/src/public/images/',
	PUBLIC_STATIC_PATH: 'src/public/',
};