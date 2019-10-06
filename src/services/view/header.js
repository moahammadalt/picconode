import { createHash } from 'globals/helpers';
import { getParentChildArr } from 'globals/helpers';
import { categoryListGet, wishlistGet } from 'services';
import { getWishListSlugsSession } from 'session/wishlist';

export default async (req) => {

  const flattenCategoriesList = await categoryListGet();
  
  const categoriesList = getParentChildArr(flattenCategoriesList).reverse();

  const wishlistItemsLength = getWishListSlugsSession(req).length;

  const wishlistProducts = await wishlistGet({
    ...req,
    query: {
      limit: 2,
    }
  });

  return {
    categoriesHash: createHash(categoriesList, 'slug'),
    wishlistItemsLength,
    ...wishlistProducts,
    flattenCategoriesHash: createHash(flattenCategoriesList, 'slug'),
    wishlistHeaderProducts: (wishlistProducts && wishlistProducts.wishlistProducts.length > 2) ? wishlistProducts.wishlistProducts.slice(0, 2) : wishlistProducts.wishlistProducts,
  }
};
