import { insert } from 'utils/db';
import {
	productDelete,
	productSizeCreate,
	productColorCreate,
	productImageCreate,
} from "services";


export default async (req) => {
	let productResponse;

	try {
		const productSizes = req.body.sizes;
		const productColors = req.body.colors;
		let mainImage = req.body.main_image;
		delete req.body.sizes;
		delete req.body.colors;
		delete req.body.images;
		req.body.main_image = mainImage && mainImage.image_name;
		
		productResponse = await insert({
			table: 'product',
			fields: [ ...Object.keys(req.body), 'admin_id' ],
			values: [ ...Object.values(req.body), req.adminUser.id ],
			data: req.body,
		});

		if(mainImage) {
			const mainImageCreated = await productImageCreate({
				...req,
				body: {
					'product_id': productResponse.id,
					'image_name': mainImage.image_name
				}
			});
			
			req.body.main_image = mainImageCreated;
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
							'height': productSizeObject.height,
							'chest': productSizeObject.chest,
							'waistline': productSizeObject.waistline,
							'hips': productSizeObject.hips,
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
					let productImages = productColorObject.images;
					if(Array.isArray(productImages) && productImages.length > 0) {
						let i = 0;
						for(const productImageObj of productImages) {
							const imageCreated = await productImageCreate({
								...req,
								body: {
									'product_color_id': productColorRecord.id,
									'product_id': productResponse.id,
									'image_name': productImageObj.image_name,
								}
							});
							productColorObject.images[i] = imageCreated;
							i++;
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