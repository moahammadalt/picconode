import { productItemGet, productListGet } from 'services';

export default async (req) => {

  const productItem = await productItemGet(req);
  req.query = {
    limit: 10,
  }
  const productListItems = (await productListGet(req)).filter(({ id })=> id !== productItem.id);;

  return {
    product: {
      ...productItem,
    },
    requestUrl: req.hostName,
    productListItems,
  }
};
