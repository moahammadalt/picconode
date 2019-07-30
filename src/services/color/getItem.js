import { select } from 'utils/db';

export default async (req) => await select({
	table: "color",
	condition: `slug='${req.params.slug}'`
});