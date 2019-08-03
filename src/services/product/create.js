import { insert, select } from 'utils/db';
import {
	productDelete,
	productSizeCreate,
	productSizeDelete,
	productColorCreate,
	productColorDelete,
} from "services";

export default async (req) => {

	const productSizes = req.body.sizes;
	const productColors = req.body.colors;
	delete req.body.sizes;
	delete req.body.colors;
	
	const productResponse = await insert({
		table: "product",
		fields: [ ...Object.keys(req.body), 'admin_id' ],
		values: [ ...Object.values(req.body), req.adminUser.id ],
		data: req.body,
	});
	
	try {
		if(productSizes && Array.isArray(productSizes)) {
			req.body.sizes = [];

			for(const productSizeObject of productSizes) {
				if(productSizeObject.is_checked) {
					const productSizeRecord = await productSizeCreate({
						body: {
							'product_id': productResponse.id,
							'size_id': productSizeObject.id,
							'size_details': productSizeObject.details,
							'amount': productSizeObject.amount,
						}
					});
					productSizeObject['relation_id'] = productSizeRecord.id;
					req.body.sizes.push(productSizeObject);
				}
			}
		}

		if(productColors && Array.isArray(productColors)) {
			req.body.colors = [];

			for(const productColorObject of productColors) {
				if(productColorObject.is_checked) {
					const productColorRecord = await productColorCreate({
						body: {
							'product_id': productResponse.id,
							'color_id': productColorObject.id,
							'amount': productColorObject.amount,
						}
					});
					productColorObject['relation_id'] = productColorRecord.id;
					req.body.colors.push(productColorObject);
				}
			}
		}
	}
	catch (err) {
		const key = 'id'

		const sizes = req.body.sizes.map(size => size.relation_id);
		await productSizeDelete({
			body: {
				[key]: sizes
			},
			key: key,
		});
		
		const colors = req.body.colors.map(color => color.relation_id);
		await productColorDelete({
			body: {
				[key]: colors
			},
			key: key,
		});

		await productDelete({
			params: {
				'slug': productResponse.slug
			}
		});

		throw err;
	}

	return {
		...req.body,
		id: productResponse.id,
	};
};