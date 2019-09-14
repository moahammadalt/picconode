import { productItemGet, productListGet } from 'services';
import { handleViewedProductsSession } from 'session/viewedProducts';

export default async (req) => {

  const productItem = await productItemGet(req);
  req.query = {
    limit: 10,
  }
  const productListItems = (await productListGet(req)).filter(({ id })=> id !== productItem.id);

  handleViewedProductsSession(req);
  
  return {
    product: {
      ...productItem,
    },
    requestUrl: req.hostName,
    productListItems,
  }
};
