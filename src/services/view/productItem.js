import { productItemGet, productListGet, colorListGet, } from 'services';
import { handleViewedProductsSession } from 'session/viewedProducts';
import { getWishListSlugsSession } from 'session/wishlist';

import { createHash } from 'globals/helpers';

export default async (req) => {

  let productItem = await productItemGet(req);

  req.query = {
    ...req.query,
    limit: 10,
    condition: `category_id = ${productItem.category_id}`,
  };
  const productListItems = (await productListGet(req)).filter(({ id })=> id !== productItem.id);

  const productsWishlistSlugs = getWishListSlugsSession(req);

  //make the default color the same of the last queried color
  const filteredColor = req.query.color;
  if(filteredColor) {
    const colorListHashObj = createHash(await colorListGet(), 'slug');
    const productHasQueriedColor = colorListHashObj.data[filteredColor] && productItem.colors.some(({ color_slug }) => color_slug === filteredColor);

    if(productHasQueriedColor) {
      const firstQueriedColorID = colorListHashObj.data[filteredColor].id;
      productItem.default_color_id = firstQueriedColorID;
    }
  }

  // colros sort
  const defaultColorIndex = productItem.colors.findIndex(
    color => productItem.default_color_id === color.color_id
  );
  const defaultColorObj = productItem.colors[defaultColorIndex];
  if (!!defaultColorObj) {
    productItem.colors.splice(defaultColorIndex, 1);
    productItem.colors.unshift(defaultColorObj);
  }


  if(productsWishlistSlugs.includes(productItem.slug)) {
    productItem['isWishlisted'] = true;
  }

  handleViewedProductsSession(req);
  
  return {
    product: {
      ...productItem,
    },
    requestUrl: req.hostName,
    productListItems,
  }
};
