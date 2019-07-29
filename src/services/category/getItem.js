import { select } from 'utils/db';

export default async (req) => await select({
	table: "category",
	condition: `slug='${req.params.slug}'`
});