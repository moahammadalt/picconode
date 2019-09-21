import config from 'config';
import { productItemGet } from 'services';
import { saveWishlistProduct } from 'session/wishlist';

export default async (req) => {
  let savedResponse;

  const productItem = await productItemGet({
    ...req,
    params: {
      slug: req.body.slug
    },
    ignoreErrorRender: true
  });

  if(productItem) {
    saveWishlistProduct(req);
    savedResponse = true;
  }
  else{
    savedResponse = false;
  }

	return {
    saved: savedResponse,
	};
};