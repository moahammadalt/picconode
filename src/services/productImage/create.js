import path from 'path';

import { insert } from 'utils/db';
import config from 'config';

export default async (req) => {
	const imagesPath = path.resolve('.') + config.PUBLIC_IMAGES_PATH;

	const response = await insert({
		table: "product_color_image",
		fields: [ ...Object.keys(req.body) ],
		values: [ ...Object.values(req.body) ],
		data: req.body,
	});

	const fullImagePath = config.IS_PROD == 1 ? (config.PROD_PUBLIC_IMAGES_PATH + response.image_name) : ((req.headers && req.headers.host) ? (req.headers.host + imagesPath + response.image_name) : null);

	return {
		...req.body,
		id: response.id,
		image_link: fullImagePath,
	};
};