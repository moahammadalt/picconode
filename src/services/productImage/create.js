import { insert } from 'utils/db';

export default async (req) => {
	const response = await insert({
		table: "product_color_image",
		fields: [ ...Object.keys(req.body) ],
		values: [ ...Object.values(req.body) ],
		data: req.body,
	});

	return {
		...req.body,
		id: response.id,
	};
};