import { insert, select } from 'utils/db';
import {
	productDelete,
	productSizeCreate,
	productSizeDelete,
	productColorCreate,
	productColorDelete,
	productImageCreate,
	productImageDelete,
} from "services";

export default async (req) => {

	const productSizes = req.body.sizes;
	const productColors = req.body.colors;
	const mainImage = req.body.main_image;
	delete req.body.sizes;
	delete req.body.colors;
	delete req.body.images;
	req.body.main_image = mainImage && mainImage.file_name;
	
	const productResponse = await insert({
		table: 'product',
		fields: [ ...Object.keys(req.body), 'admin_id' ],
		values: [ ...Object.values(req.body), req.adminUser.id ],
		data: req.body,
	});

	try {
		if(mainImage) {
			await productImageCreate({
				body: {
					'product_id': productResponse.id,
					'image_name': mainImage.file_name
				}
			});
			
			req.body.main_image = { file_name: mainImage.file_name };
		}

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
					let productImages = productColorObject.images
					if(Array.isArray(productImages) && productImages.length > 0) {
						for(const productImageObj of productImages) {
							await productImageCreate({
								body: {
									'product_color_id': productColorRecord.id,
									'product_id': productResponse.id,
									'image_name': productImageObj.file_name,
								}
							});
							//productImageObj['image_link'] = 'fff';
						}
					}

					req.body.colors.push(productColorObject);
				}
			}
		}

		return {
			...req.body,
			id: productResponse.id,
		};
	}
	catch (err) {
		await productDelete({
			params: {
				'slug': productResponse.slug
			}
		});

		throw err;
	}
};