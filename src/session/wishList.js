export const saveWishlistProduct = req => {
  if (!req.session.productsWishlist) {
    req.session.productsWishlist = [];
  }

  if (!req.session.productsWishlist.includes(req.body.slug)) {
    req.session.productsWishlist.push(req.body.slug);
  }
  return req.session.productsWishlist || [];
};

export const deleteWishlistSessionItem = req => {
  if(req.session.productsWishlist.includes(req.body.slug)) {
    req.session.productsWishlist.splice(req.body.slug, 1);
    return true;
  }
  else {
    return false;
  }
};

export const getWishListSession = req => req.session.productsWishlist || [];