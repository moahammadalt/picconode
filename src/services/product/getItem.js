import { select } from 'utils/db';
import { createHash } from 'globals/helpers';

import {
  productSizeItemGet,
  productColorItemGet,
  sizeListGet,
  colorListGet,
  categoryListGet,
  productImageGet,
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

  const productImages = await productImageGet({
    ...req,
    body: {
      'product_id': productItem.id
    },
    key: 'product_id'
  });

  if(productItem.main_image) {
    const mainImageObj = productImages.find(productImageObj => productImageObj.product_id === productItem.id && productImageObj.image_name === productItem.main_image);
    productItem.main_image = mainImageObj;
  }

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

  productItem['category_name'] = categories[productItem.category_id] && categories[productItem.category_id].name;
  productItem['category_type_name'] = categories[productItem.category_type_id] && categories[productItem.category_type_id].name;

  productItem['sizes'] = productSizeItemArr.map(productSizeItem => {
    productSizeItem['size_name'] = sizes[productSizeItem.size_id].name;
    return productSizeItem;
  });

  productItem['colors'] = productColorItemArr.map(productColorItem => {
    productColorItem['color_name'] = colors[productColorItem.color_id].name;
    productColorItem['images'] = productImages.filter(productImageObj => productColorItem.product_id === productImageObj.product_id && productColorItem.id === productImageObj.product_color_id);
    return productColorItem;
  });

  return productItem;
};
