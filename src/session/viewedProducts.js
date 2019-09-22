export const handleViewedProductsSession = req => {
  if (!req.session.viewedProducts) {
    req.session.viewedProducts = [];
  }

  if (!req.session.viewedProducts.includes(req.params.slug)) {
    if (req.session.viewedProducts.length === 20) {
      req.session.viewedProducts.shift();
    }
    req.session.viewedProducts.push(req.params.slug);
  }
};

export const getViewdProductsSlugs = req => req.session.viewedProducts || [];