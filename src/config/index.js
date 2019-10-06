require('dotenv').config();
import path from 'path';
import fs from 'fs';

export default {
	PORT: process.env.PORT,
	HOSTNAME: process.env.HOSTNAME,
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
	MAIL: {
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_OUTGOING_HOST,
		mainUserName: process.env.MAIL_MAIN_USER_NAME,
		mainUserPassword: process.env.MAIL_MAIN_USER_PASSWORD,
		salesUser: process.env.MAIL_SALES_USER_NAME,
		contactUser: process.env.MAIL_CONTACT_USER_NAME,
	},
	PUBLIC_VIEW_PATH: '/src/views/',
	PUBLIC_IMAGES_PATH: '/src/public/images/',
	PUBLIC_THUMBNAIL_IMAGES_PATH: '/src/public/imagesThumbnail/',
	PUBLIC_SMALL_IMAGES_PATH: '/src/public/imagesSmall/',
	PUBLIC_IMAGES_LINK: '/images/',
	PUBLIC_THUMBNAIL_IMAGES_LINK: '/imagesThumbnail/',
	PUBLIC_SMALL_IMAGES_LINK: '/imagesSmall/',
	PUBLIC_STATIC_PATH: 'src/public/',
	THUMBNAIL_IMAGE_PREFIX: 'thumbnail_',
	SMALL_IMAGE_PREFIX: 'small_',
	THUMBNAIL_IMAGE_SIZE_CONVERSION: {
		width: 6.5211,
		height: 6.7,
	},
	SMALL_IMAGE_SIZE_CONVERSION: {
		width: 1.538,
		height: 1.34,
	},
	SESSION_SECRET: process.env.SESSION_SECRET,
};