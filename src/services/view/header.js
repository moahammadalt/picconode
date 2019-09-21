import { createHash } from 'globals/helpers';
import { getParentChildArr } from 'globals/helpers';
import { categoryListGet, wishlistGet } from 'services';
import { getWishListSlugsSession } from 'session/wishlist';

export default async (req) => {
  
  const categoriesList = getParentChildArr(await categoryListGet());

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
  }
};
