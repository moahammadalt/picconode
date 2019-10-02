import { productItemGet, productListGet } from 'services';
import { handleViewedProductsSession } from 'session/viewedProducts';
import { getWishListSlugsSession } from 'session/wishlist';

export default async (req) => {

  let productItem = await productItemGet(req);
  req.query = {
    limit: 10,
  }
  const productListItems = (await productListGet(req)).filter(({ id })=> id !== productItem.id);

  const productsWishlistSlugs = getWishListSlugsSession(req);

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

  productItem['price'] = productItem.price || (productItem.sizes[0] && productItem.sizes[0].size_price);

  handleViewedProductsSession(req);
  
  return {
    product: {
      ...productItem,
    },
    requestUrl: req.hostName,
    productListItems,
  }
};
