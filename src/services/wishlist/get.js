import { getWishListSlugsSession } from 'session/wishlist';
import { productItemGet } from 'services';

export default async (req) => {

  const allWishlistProductsSlug = getWishListSlugsSession(req);
  let wishlistProductsSlug;
  let wishlistProducts = [];

  if(req.query.limit) {
    wishlistProductsSlug = allWishlistProductsSlug.slice(0, req.query.limit);
  }
  else {
    wishlistProductsSlug = allWishlistProductsSlug;
  }

  // prepare wishlisted products
  for (let slug of wishlistProductsSlug) {
    let productItem = await productItemGet({
      ...req,
      params: {
        slug
      },
      ignoreErrorRender: true
    });
    
    productItem && wishlistProducts.push(productItem);
  }

  return { wishlistProducts };
};