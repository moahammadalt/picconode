import { select } from 'utils/db';
import config from 'config';
import path from 'path';

export default async (req) => {

	let productImages = await select({
		table: "product_color_image",
		condition: `${req.key} = '${req.body[req.key]}'`
	});

	const imagesPath = path.resolve('.') + config.PUBLIC_IMAGES_PATH;

	return productImages.map(productImageObj => {
		productImageObj['image_link'] = (req.headers && req.headers.host) ? (req.headers.host + imagesPath + productImageObj.image_name) : null;
		return productImageObj;
	});
};