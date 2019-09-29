import { select } from 'utils/db';
import { createHash } from 'globals/helpers';

import {
  productSizeListGet,
  productColorListGet,
  sizeListGet,
  colorListGet,
	categoryListGet,
	productImageGetList,
} from 'services';

export default async (req) => {
	try {
		let productList = await select({
			table: 'product',
			...req.query,
		});

		const productImageList = await productImageGetList(req);
		const productSizeList = await productSizeListGet();
		const productColorList = await productColorListGet();
		const categories = createHash(await categoryListGet(), 'id').data;
		const sizes = createHash(await sizeListGet(), 'id').data;
		const colors = createHash(await colorListGet(), 'id').data;

		return productList.map(productItem => {
			const productImages = productImageList.filter(productImageItem => productImageItem.product_id === productItem.id)

			if(productItem.main_image) {
				const mainImageObj = productImages.find(productImageObj => productImageObj.product_id === productItem.id && productImageObj.image_name === productItem.main_image);
				productItem.main_image = mainImageObj;
			}

			if(productItem.category_id && categories[productItem.category_id]) {
				productItem['category_slug'] = categories[productItem.category_id].slug;
			}

			if(productItem.category_type_id && categories[productItem.category_type_id]) {
				productItem['category_type_slug'] = categories[productItem.category_type_id].slug;
			}
			
			if(productItem.category_tag_id && categories[productItem.category_tag_id]) {
				productItem['category_tag_slug'] = categories[productItem.category_tag_id].slug;
			}
			
			let productSizeItemArr = productSizeList.filter(productSizeItem => productSizeItem.product_id === productItem.id);

			productItem['sizes'] = productSizeItemArr.map(productSizeItem => {
				productSizeItem['size_name'] = sizes[productSizeItem.size_id].name;
				productSizeItem['size_slug'] = sizes[productSizeItem.size_id].slug;
				return productSizeItem;
			});
			
			let productColorItemArr = productColorList.filter(productColorItem => productColorItem.product_id === productItem.id);

			productItem['colors'] = productColorItemArr.map(productColorItem => {
				productColorItem['color_name'] = colors[productColorItem.color_id].name;
				productColorItem['color_slug'] = colors[productColorItem.color_id].slug;
				productColorItem['images'] = productImages.filter(productImageObj => productColorItem.product_id === productImageObj.product_id && productColorItem.id === productImageObj.product_color_id);
				return productColorItem;
			});
			//productItem['colors'] = productItem['colors'].reverse();
			return productItem;
		});
	}
	catch (err) {
		throw err;
	}
};
