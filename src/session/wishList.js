export const saveWishlistProduct = req => {
  if (!req.session.productsWishlistSlugs) {
    req.session.productsWishlistSlugs = [];
  }

  if (!req.session.productsWishlistSlugs.includes(req.body.slug)) {
    req.session.productsWishlistSlugs.push(req.body.slug);
  }
  return req.session.productsWishlistSlugs || [];
};

export const deleteWishlistSessionItem = req => {
  if(req.session.productsWishlistSlugs && req.session.productsWishlistSlugs.includes(req.body.slug)) {
    const slugIndex = req.session.productsWishlistSlugs.findIndex(slug => slug === req.body.slug);
    req.session.productsWishlistSlugs.splice(slugIndex, 1);
    return true;
  }
  else {
    return false;
  }
};

export const getWishListSlugsSession = req => req.session.productsWishlistSlugs ? req.session.productsWishlistSlugs.reverse() : [];