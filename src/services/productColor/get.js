import { select } from 'utils/db';

export default async (req) => await select({
	table: "product_color",
	condition: `product_id = '${req.body.product_id}'`
});