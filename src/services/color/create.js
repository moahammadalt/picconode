import { insert } from 'utils/db';

export default async (req) => {
	
	const response = await insert({
		table: "color",
		fields: [ ...Object.keys(req.body), 'admin_id' ],
		values: [ ...Object.values(req.body), req.adminUser.id ],
		data: req.body,
	});

	return {
		...req.body,
		id: response.id,
	};
};