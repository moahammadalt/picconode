import { select } from 'utils/db';

export default async (req) => {

	let productImages = await select({
		table: "product_color_image",
		condition: `${req.key} = '${req.body[req.key]}'`
	});

	return productImages.map(productImageObj => {
		productImageObj['image_link'] = (req.headers && req.headers.host) ? ('/images/' +  productImageObj.image_name) : null;
		return productImageObj;
	});
};