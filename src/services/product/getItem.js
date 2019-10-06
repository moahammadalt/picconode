import { select } from 'utils/db';
import { createHash } from 'globals/helpers';
import { errorMessages } from 'globals/constants';
import routes from "config/routes";

import {
  productSizeItemGet,
  productColorItemGet,
  sizeListGet,
  colorListGet,
  categoryListGet,
  productImageGet,
} from 'services';

export default async req => {
  // TODO: fix- static files also hit this function and making sql request to fetch a product

  let productItemArr = await select({
    table: 'product',
    condition: `${(isNaN(req.params.slug) ? 'slug' : 'id')}='${req.params.slug}'`
  });

  if(!productItemArr || productItemArr.length === 0) {
    if(!req.ignoreErrorRender) {
      throw {
        errorRedirectPath: routes.publicApi.productNotFound.path,
        errorMessage: errorMessages.notFound,
      }
    }
    else {
      return;
    }    
  }

  let productItem = productItemArr[0];

  if(productItem.stock_status === 0) {
    throw {
      errorRedirectPath: routes.publicApi.productNotFound.path,
      errorMessage: errorMessages.outOfStock,
    }
  }
  
  let categories = createHash(await categoryListGet(), 'id').data;
  let sizes = createHash(await sizeListGet(), 'id').data;
  let colors = createHash(await colorListGet(), 'id').data;

  const productImages = await productImageGet({
    ...req,
    body: {
      'product_id': productItem.id
    },
    key: 'product_id',
    query: {
      orderBy: 'id',
      sort: 'ASC',
    }
  });

  if(productItem.main_image) {
    const mainImageObj = productImages.find(productImageObj => productImageObj.product_id === productItem.id && productImageObj.image_name === productItem.main_image);
    productItem.main_image = mainImageObj;
  }

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
  
  if(productItem.category_id && categories[productItem.category_id]) {
    productItem['category'] = {
      ...categories[productItem.category_id]
    }
  }

  if(productItem.category_type_id && categories[productItem.category_type_id]) {
    productItem['category_type'] = {
      ...categories[productItem.category_type_id]
    }
  }

  if(productItem.category_tag_id && categories[productItem.category_tag_id]) {
    productItem['category_tag'] = {
      ...categories[productItem.category_tag_id]
    }
  }

  productItem['sizes'] = productSizeItemArr.map(productSizeItem => {
    productSizeItem['size_name'] = sizes[productSizeItem.size_id].name;
    productSizeItem['size_slug'] = sizes[productSizeItem.size_id].slug;
    return productSizeItem;
  });

  productItem['link'] = (req.protocol && req.headers && req.originalUrl) && req.protocol + '://' + req.headers.host + req.originalUrl;
  
 
  productItem['colors'] = productColorItemArr.map(productColorItem => {
    productColorItem['color_name'] = colors[productColorItem.color_id].name;
    productColorItem['color_slug'] = colors[productColorItem.color_id].slug;
    productColorItem['images'] = productImages.filter(productImageObj =>  productColorItem.id === productImageObj.product_color_id);
    return productColorItem;
  });

  return productItem;
};
