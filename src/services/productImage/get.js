import { select } from 'utils/db';

export default async (req) => await select({
	table: "product_color_image",
	condition: `${req.key} = '${req.body[req.key]}'`
});