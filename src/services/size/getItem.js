import { select } from 'utils/db';

export default async (req) => await select({
	table: "size",
	condition: `slug='${req.params.slug}'`
});