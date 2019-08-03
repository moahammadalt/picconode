import { select } from 'utils/db';
import { createHash } from 'globals/helpers';

import {
  productSizeItemGet,
  productColorItemGet,
  sizeListGet,
  colorListGet,
  categoryListGet
} from 'services';

export default async () => {
  let productList = await select({
    table: 'product'
	});

	let categories = createHash(await categoryListGet(), 'id').data;
  let sizes = createHash(await sizeListGet(), 'id').data;
	let colors = createHash(await colorListGet(), 'id').data;

	for(const productItem of productList) {
		let productSizeItemArr = await productSizeItemGet({
			body: {
				product_id: productItem.id
			}
		});	
	
		let productColorItemArr = await productColorItemGet({
			body: {
				product_id: productItem.id
			}
		});
	
		productItem['category_name'] = categories[productItem.category_id].name;
		productItem['category_type_name'] = categories[productItem.category_type_id].name;
	
		productItem['sizes'] = productSizeItemArr.map(productSizeItem => {
			productSizeItem['size_name'] = sizes[productSizeItem.size_id].name;
			productSizeItem['size_slug'] = sizes[productSizeItem.size_id].slug;
			return productSizeItem;
		});
	
		productItem['colors'] = productColorItemArr.map(productColorItem => {
			productColorItem['color_name'] = colors[productColorItem.color_id].name;
			productColorItem['color_slug'] = colors[productColorItem.color_id].slug;
			return productColorItem;
		});
	}

	return productList;
};
