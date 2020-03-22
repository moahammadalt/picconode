import {
  productListGet,
  colorListGet,
  sizeListGet,
  productItemGet,
} from 'services';
import { getViewdProductsSlugs } from 'session/viewedProducts';
import { validateFilterQuery } from './utils';
import { getFilterFieldsObjNames } from 'utils/filter';
import { createHash } from 'globals/helpers';
import { defaultLimit, defaultPage } from 'config/filter';

export default async req => {

  try {

    let categoriesListHash = req.headerViewData.categoriesHash.data;

    const allColorsList = await colorListGet();
    const colorListHashObj = createHash(allColorsList, 'slug');
    const sizeListHashObj = createHash(await sizeListGet(), 'slug');
    let productListCount;

    let recentViewedProducts = [];

    const page = req.query.page || defaultPage;
    const limit = req.query.limit || defaultLimit;
    delete req.query.page;
    delete req.query.limit;

    // TODO: move this to a middleware
    validateFilterQuery({
      query: req.query,
      availablesColorsSlugs: Object.keys(colorListHashObj.data),
      availablesSizesSlugs: Object.keys(sizeListHashObj.data),
      flattenCategoriesHash: req.headerViewData.flattenCategoriesHash
    });

    const filterHasCategories = !!(req.query.category || req.query.type || req.query.tag);

    let productList = await productListGet({
      ...req,
      query: {
        ...req.query,
        sort: req.query.sort,
      }
    });

    const filterFieldsObj = getFilterFieldsObjNames();

    productList = productList
      .filter(product => {
        let filter = {...filterFieldsObj};

        if (req.query.category) {
          filter.category = product.category_slug === req.query.category;
        }

        return filter.category;
      })
      .map(product => {
        // add product color count
        for (const singleColorObj of product.colors) {
          if (!colorListHashObj.data[singleColorObj.color_slug].productsCount) {
            colorListHashObj.data[singleColorObj.color_slug].productsCount = 0;
          }
          colorListHashObj.data[singleColorObj.color_slug].productsCount += 1;
        }

        // add product size count
        for (const singleSizeObj of product.sizes) {
          if (!sizeListHashObj.data[singleSizeObj.size_slug].productsCount) {
            sizeListHashObj.data[singleSizeObj.size_slug].productsCount = 0;
          }
          sizeListHashObj.data[singleSizeObj.size_slug].productsCount += 1;
        }

        // add product category count
        if(!categoriesListHash[product.category_slug].productsCount) {
          categoriesListHash[product.category_slug].productsCount = 0;
        }
        categoriesListHash[product.category_slug].productsCount += 1;

        // add product category type count
        const categoryTypeIndex = categoriesListHash[product.category_slug].children.findIndex(({ slug }) => slug === product.category_type_slug);

        if(categoryTypeIndex > -1) {
          if(categoriesListHash[product.category_slug].children[categoryTypeIndex]) {
          
            if(!categoriesListHash[product.category_slug].children[categoryTypeIndex].productsCount) {
              categoriesListHash[product.category_slug].children[categoryTypeIndex].productsCount = 0;
            }
            categoriesListHash[product.category_slug].children[categoryTypeIndex].productsCount += 1;
  
            // add product category tag count
            if(product.category_tag_slug) {
              const categoryTagIndex = categoriesListHash[product.category_slug].children[categoryTypeIndex].children.findIndex(({ slug }) => slug === product.category_tag_slug);
  
              if(categoryTagIndex > -1) {
                if(!categoriesListHash[product.category_slug].children[categoryTypeIndex].children[categoryTagIndex].productsCount) {
                  categoriesListHash[product.category_slug].children[categoryTypeIndex].children[categoryTagIndex].productsCount = 0;
                }
  
                categoriesListHash[product.category_slug].children[categoryTypeIndex].children[categoryTagIndex].productsCount += 1;
              }
            }
          }
        }

        return product;
      })
      .filter((product) => {
        let filter = {...filterFieldsObj};

        if (req.query.type) {
          filter.type = product.category_type_slug === req.query.type;
        }

        if (req.query.tag) {
          filter.tag = product.category_tag_slug === req.query.tag;
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

        return filter.type && filter.tag && filter.price && filter.color && filter.size;
      });

    productListCount = productList.length;
    
    // only filter the products that in view pagination limit
    productList = productList.filter((product, index) => {
      const fromIndex = (page * limit) - limit;
      const toIndex = (page * limit) - 1;

      let inSearchPaginationLimit = (index >= fromIndex) && (index <= toIndex);
      return inSearchPaginationLimit;
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
      filterHasCategories,
      productListCount,
      productList,
      requestedURl: req.protocol + '://' + req.get('host') + req.originalUrl,
      query: {
        ...req.query,
        ...(page !== defaultPage && { page }),
        ...(limit !== defaultLimit && { limit }),
      },
      recentViewedProducts,
      colorList: colorListHashObj.values(),
      sizeList: sizeListHashObj.values(),
    };
  }
  catch (err) {
    console.log('err', err);
  }
};
