export const handleViewedProductsSession = req => {
  if (!req.session.viewedProducts.includes(req.params.slug)) {
    if (req.session.viewedProducts.length === 4) {
      req.session.viewedProducts.shift(req.params.slug);
    }
    req.session.viewedProducts.push(req.params.slug);
  }
};

export const getViewdProductsSlugs = req => req.session.viewedProducts || [];