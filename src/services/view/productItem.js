import { productItemGet, productListGet } from 'services';
import { handleViewedProductsSession } from 'session/viewedProducts';
import { getWishListSlugsSession } from 'session/wishlist';

export default async (req) => {

  const productItem = await productItemGet(req);
  req.query = {
    limit: 10,
  }
  const productListItems = (await productListGet(req)).filter(({ id })=> id !== productItem.id);

  const productsWishlistSlugs = getWishListSlugsSession(req);

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
