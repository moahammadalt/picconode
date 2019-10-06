import { select } from 'utils/db';

export default async () => await select({
	table: 'size',
	sort: 'ASC',
});