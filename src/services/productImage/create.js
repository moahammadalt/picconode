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

	const fullImagePath = config.PUBLIC_IMAGES_LINK + response.image_name;

	return {
		...req.body,
		id: response.id,
		image_link: fullImagePath,
	};
};