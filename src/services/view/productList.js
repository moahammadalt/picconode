import { select } from 'utils/db';
import {
  productListGet,
  colorListGet,
  sizeListGet,
  categoryListGet,
  productItemGet
} from 'services';
import { getViewdProductsSlugs } from 'session/viewedProducts';
import { validateFilterQuery } from './utils';
import { createHash } from 'globals/helpers';

export default async req => {
  const clorListHashObj = createHash(await colorListGet(), 'slug');
  const sizeListHashObj = createHash(await sizeListGet(), 'slug');
  const categoryListHashObj = createHash(await categoryListGet(), 'slug');
  const productListCount = (await select({
    count: true,
    table: 'product'
  }))[0].rowsCount;

  let recentViewedProducts = [];

  // TODO: move this to a middleware
  validateFilterQuery({
    query: req.query,
    availablesColorsSlugs: Object.keys(clorListHashObj.data),
    availablesSizesSlugs: Object.keys(sizeListHashObj.data),
    categoriesSlugs: Object.keys(categoryListHashObj.data)
  });

  console.log('req.query', req.query);

  let productList = await productListGet({
    ...req,
    query: {
      ...req.query,
      orderBy: req.query.orderBy ? req.query.orderBy : 'date_created',
      sort: req.query.sort ? req.query.sort : 'DESC'
    }
  });

  productList = productList
    .filter(product => {
      let filter = {
        category: true,
        price: true,
        color: true,
        size: true
      };
      if (req.query.category) {
        filter.category = product.category_slug === req.query.category;
      }

      if (req.query.price) {
        const priceArr = req.query.price.split('-');
        filter.price =
          product.price >= priceArr[0] && product.price <= priceArr[1];
      }

      if (req.query.color) {
        const colorArr = req.query.color.split(',');
        filter.color =
          !product.colors ||
          product.colors.length === 0 ||
          product.colors.some(({ color_slug }) =>
            colorArr.includes(color_slug)
          );
      }

      if (req.query.size) {
        const sizeArr = req.query.size.split(',');
        filter.size =
          !product.sizes ||
          product.sizes.length === 0 ||
          product.sizes.some(({ size_slug }) => sizeArr.includes(size_slug));
      }

      return filter.category && filter.price && filter.color && filter.size;
    })
    .map(product => {
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
      for (const singleColorObj of product.colors) {
        if (!clorListHashObj.data[singleColorObj.color_slug].productsCount) {
          clorListHashObj.data[singleColorObj.color_slug].productsCount = 0;
        }
        clorListHashObj.data[singleColorObj.color_slug].productsCount += 1;
      }

      // add product size count
      for (const singleSizeObj of product.sizes) {
        if (!sizeListHashObj.data[singleSizeObj.size_slug].productsCount) {
          sizeListHashObj.data[singleSizeObj.size_slug].productsCount = 0;
        }
        sizeListHashObj.data[singleSizeObj.size_slug].productsCount += 1;
      }

      return product;
    });

  // prepare recent products
  let tmpProductsArr = [];
  for (const slug of getViewdProductsSlugs(req)) {
    const productItem = await productItemGet({
      ...req,
      params: {
        slug
      },
      ignoreErrorRender: true
    });
    productItem && tmpProductsArr.push(productItem);
  }

  for (let index = 0; index < tmpProductsArr.length; index++) {
    const element = tmpProductsArr[index];
    if (index % 2 === 0) {
      recentViewedProducts.push([element]);
    } else {
      recentViewedProducts[recentViewedProducts.length - 1].push(element);
    }
  }

  return {
    productListCount,
    productList,
    requestedURl: req.protocol + '://' + req.get('host') + req.originalUrl,
    initialQuery: { ...req.query },
    query: req.query,
    recentViewedProducts,
    colorList: Object.values(clorListHashObj.data),
    sizeList: Object.values(sizeListHashObj.data)
  };
};
