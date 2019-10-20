import JWT from 'utils/jwt';

import { getParentChildArr, createHash, checkValue } from 'globals/helpers';
import { categoryListGet, wishlistGet } from 'services';
import { getWishListSlugsSession } from 'session/wishlist';
import { getLoggedInUserTokenSession } from 'session/user';

export default async req => {
  let user;

  const flattenCategoriesList = await categoryListGet();

  const categoriesList = getParentChildArr(flattenCategoriesList).reverse();

  const wishlistItemsLength = getWishListSlugsSession(req)
    ? getWishListSlugsSession(req).length
    : 0;

  const userToken = getLoggedInUserTokenSession(req);

  try {
    if (checkValue(userToken)) {
      user = await JWT.verify(userToken);
    }
  } catch (Err) {
    user = undefined;
  }

  const wishlistProducts = await wishlistGet({
    ...req,
    query: {
      limit: 2
    }
  });

  return {
    categoriesHash: createHash(categoriesList, 'slug'),
    wishlistItemsLength,
    ...wishlistProducts,
    user,
    flattenCategoriesHash: createHash(flattenCategoriesList, 'slug'),
    wishlistHeaderProducts:
      wishlistProducts && wishlistProducts.wishlistProducts.length > 2
        ? wishlistProducts.wishlistProducts.slice(0, 2)
        : wishlistProducts.wishlistProducts
  };
};
