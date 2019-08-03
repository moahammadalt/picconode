import { select } from 'utils/db';
import { createHash } from 'globals/helpers';

import {
  productSizeItemGet,
  productColorItemGet,
  sizeListGet,
  colorListGet,
  categoryListGet
} from 'services';

export default async req => {
  let categories = createHash(await categoryListGet(), 'id').data;
  let sizes = createHash(await sizeListGet(), 'id').data;
  let colors = createHash(await colorListGet(), 'id').data;

  let productItemArr = await select({
    table: 'product',
    condition: `slug='${req.params.slug}'`
  });
  let productItem = productItemArr[0];

  let productSizeItemArr = await productSizeItemGet({
    body: {
      product_id: productItemArr[0].id
    }
  });

  let productColorItemArr = await productColorItemGet({
    body: {
      product_id: productItemArr[0].id
    }
  });

  productItem['category_name'] = categories[productItem.category_id].name;

  productItem['sizes'] = productSizeItemArr.map(productSizeItem => {
    productSizeItem['size_name'] = sizes[productSizeItem.size_id].name;
    return productSizeItem;
  });

  productItem['colors'] = productColorItemArr.map(productColorItem => {
    productColorItem['color_name'] = colors[productColorItem.color_id].name;
    return productColorItem;
  });

  return productItem;
};
