import { insert } from 'utils/db';

export default async (req) => {
	try{
		const response = await insert({
			table: "product_color",
			fields: [ ...Object.keys(req.body) ],
			values: [ ...Object.values(req.body) ],
			data: req.body,
		});

		return {
			...req.body,
			id: response.id,
		};
	}
	catch (err) {
		throw err;
	}
};