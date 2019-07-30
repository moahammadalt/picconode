import { select } from 'utils/db';

export default async (req) => await select({
	table: "product",
	condition: `slug='${req.params.slug}'`
});