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

	return {
		...req.body,
		id: response.id,
		image_link: (req.headers && req.headers.host) ? (req.headers.host + imagesPath + response.image_name) : null,
	};
};