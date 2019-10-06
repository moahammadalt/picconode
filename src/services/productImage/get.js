import { select } from 'utils/db';
import config from 'config';

export default async (req) => {

	let productImages = await select({
		table: "product_color_image",
		condition: `${req.key} = '${req.body[req.key]}'`,
		...req.query,
	});

	return productImages.map(productImageObj => {
		productImageObj['image_link'] = (req.headers && req.headers.host) ? ('/images/' +  productImageObj.image_name) : null;

		productImageObj['small_image_name'] = config.SMALL_IMAGE_PREFIX + productImageObj.image_name;
    productImageObj['small_image_link'] = (req.headers && req.headers.host) ? (config.PUBLIC_SMALL_IMAGES_LINK + productImageObj.small_image_name) : null;

    productImageObj['thumbnail_image_name'] = config.THUMBNAIL_IMAGE_PREFIX + productImageObj.image_name;
		productImageObj['thumbnail_image_link'] = (req.headers && req.headers.host) ? (config.PUBLIC_THUMBNAIL_IMAGES_LINK + productImageObj.thumbnail_image_name) : null;
		
		return productImageObj;
	});
};