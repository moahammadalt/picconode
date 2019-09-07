import { select } from "utils/db";
import { productListGet, colorListGet, sizeListGet } from 'services';

export default async (req) => {
  req.query['orderBy'] = req.query.orderBy ? req.query.orderBy : 'date_created';
  req.query['sort'] = req.query.sort ? req.query.sort : 'DESC';
  req.query['page'] = req.query.page ? req.query.page : 1;
  req.query['limit'] = req.query.limit ? req.query.limit : 100;
  
  let productList = await productListGet(req);
  const colorList = await colorListGet();
  const sizeList = await sizeListGet();
  const productListCountArr = await select({
    count: true,
    table: 'product',
  });

  productList = productList.map(product => {

    // colros sort
    const defaultColorIndex = product.colors.findIndex(color => product.default_color_id === color.color_id);
    const defaultColorObj = product.colors[defaultColorIndex];
    if(!!defaultColorObj /* && defaultColorObj.images.length > 2 */) {
      product.colors.splice(defaultColorIndex, 1);
      product.colors.unshift(defaultColorObj);
    }

    return product;
  })
  

  return {
    rowsCount: productListCountArr[0].rowsCount,
    productList,
    colorList,
    sizeList
  }
};
