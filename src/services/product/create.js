import { insert, select } from 'utils/db';
import {
	productDelete,
	productSizeCreate,
} from "services";

export default async (req) => {

	const productSizes = req.body.sizes;
	const productCategories = req.body.categories;
	delete req.body.sizes;
	delete req.body.categories;
	
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
					await productSizeCreate({
						body: {
							'product_id': productResponse.id,
							'size_id': productSizeObject.id,
							'size_details': productSizeObject.details,
							'amount': productSizeObject.amount,
						}
					});
					req.body.sizes.push(productSizeObject);
				}
			}
		}
	}
	catch (err) {
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