import { select } from 'utils/db';
import { productListGet, colorListGet, sizeListGet } from 'services';
import { validateFilterQuery } from './utils';
import { createHash } from 'globals/helpers';

export default async req => {
  // TODO: move this to a middleware
  validateFilterQuery(req.query);

  let productList = await productListGet({
    ...req,
    query: {
      ...req.query,
      orderBy: req.query.orderBy ? req.query.orderBy : 'date_created',
      sort: req.query.sort ? req.query.sort : 'DESC',
    }
  });

  const clorListHashObj = createHash(await colorListGet(), 'slug');
  const sizeListHashObj = createHash(await sizeListGet(), 'slug');
  const productListCount = (await select({
    count: true,
    table: 'product',
  }))[0].rowsCount;

  productList = productList.map(product => {
    // colros sort
    const defaultColorIndex = product.colors.findIndex(
      color => product.default_color_id === color.color_id
    );
    const defaultColorObj = product.colors[defaultColorIndex];
    if (!!defaultColorObj /* && defaultColorObj.images.length > 2 */) {
      product.colors.splice(defaultColorIndex, 1);
      product.colors.unshift(defaultColorObj);
    }

    // add product color count
    for(const singleColorObj of product.colors){
      if(!clorListHashObj.data[singleColorObj.color_slug].productsCount) {
        clorListHashObj.data[singleColorObj.color_slug].productsCount = 0;
      }
      clorListHashObj.data[singleColorObj.color_slug].productsCount += 1;
    }
    
    // add product size count
    for(const singleSizeObj of product.sizes){
      if(!sizeListHashObj.data[singleSizeObj.size_slug].productsCount) {
        sizeListHashObj.data[singleSizeObj.size_slug].productsCount = 0;
      }
      sizeListHashObj.data[singleSizeObj.size_slug].productsCount += 1;
    }

    return product;
  });

  return {
    productListCount,
    productList,
    requestedURl: req.protocol + '://' + req.get('host') + req.originalUrl,
    initialQuery: { ...req.query },
    query: req.query,
    colorList: Object.values(clorListHashObj.data),
    sizeList: Object.values(sizeListHashObj.data),
  };
};
