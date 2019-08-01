import { select } from 'utils/db';

export default async (req) => await select({
	table: "product_size",
	condition: `product_id = '${req.body.product_id}'`
});