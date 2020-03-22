import { select } from 'utils/db';
import { createHash } from 'globals/helpers';

import {
  productSizeListGet,
  productColorListGet,
  sizeListGet,
  colorListGet,
  categoryListGet,
  productImageGetList
} from 'services';
import { getWishListSlugsSession } from 'session/wishlist';

export default async req => {
  try {
    let productList = await select({
      table: 'product',
      ...req.query,
      orderBy: req.query.orderBy || 'sort_index',
      sort: 'ASC',
      condition: req.condition
    });

    const productImageList = await productImageGetList({
      ...req,
      query: {
        orderBy: 'id',
        sort: 'ASC'
      }
    });

    const productSizeList = await productSizeListGet();
    const productColorList = await productColorListGet();
    const categories = createHash(await categoryListGet(), 'id').data;
    const sizes = createHash(await sizeListGet(), 'id').data;
    const allColorsList = await colorListGet();
    const colors = createHash(allColorsList, 'id').data;
    const colorListHashObj = createHash(allColorsList, 'slug');
    const colorListHashIDsObj = createHash(allColorsList, 'id');

    const productsWishlistSlugs = getWishListSlugsSession(req);

    return productList
      .map(productItem => {
        const productImages = productImageList.filter(
          productImageItem => productImageItem.product_id === productItem.id
        );

        if (productItem.main_image) {
          const mainImageObj = productImages.find(
            productImageObj =>
              productImageObj.product_id === productItem.id &&
              productImageObj.image_name === productItem.main_image
          );
          productItem.main_image = mainImageObj;
        }

        if (productItem.category_id && categories[productItem.category_id]) {
          productItem['category_slug'] =
            categories[productItem.category_id].slug;
        }

        if (
          productItem.category_type_id &&
          categories[productItem.category_type_id]
        ) {
          productItem['category_type_slug'] =
            categories[productItem.category_type_id].slug;
        }

        if (
          productItem.category_tag_id &&
          categories[productItem.category_tag_id]
        ) {
          productItem['category_tag_slug'] =
            categories[productItem.category_tag_id].slug;
        }

        let productSizeItemArr = productSizeList.filter(
          productSizeItem => productSizeItem.product_id === productItem.id
        );

        productItem['sizes'] = productSizeItemArr.map(productSizeItem => {
          productSizeItem['size_name'] = sizes[productSizeItem.size_id].name;
          productSizeItem['size_slug'] = sizes[productSizeItem.size_id].slug;
          return productSizeItem;
        });

        let productColorItemArr = productColorList.filter(
          productColorItem => productColorItem.product_id === productItem.id
        );

        productItem['colors'] = productColorItemArr.map(productColorItem => {
          productColorItem['color_name'] =
            colors[productColorItem.color_id].name;
          productColorItem['color_slug'] =
            colors[productColorItem.color_id].slug;
          productColorItem['color_hex'] =
            colors[productColorItem.color_id].hex_code;
          productColorItem['color_hex_arr'] = colors[productColorItem.color_id]
            .hex_code
            ? colors[productColorItem.color_id].hex_code.split(',')
            : [];
          productColorItem['images'] = productImages.filter(
            productImageObj =>
              productColorItem.product_id === productImageObj.product_id &&
              productColorItem.id === productImageObj.product_color_id
          );
          return productColorItem;
        });

        //make the default color the same of the last queried color
        if (
          req.query.color &&
          req.originalUrl &&
          req.originalUrl.includes('/products/')
        ) {
          const allFilteredColors = req.query.color.split(',');
          const lastQueriedColorSlug =
            allFilteredColors[allFilteredColors.length - 1];
          const lastQueriedColorID =
            colorListHashObj.data[lastQueriedColorSlug].id;
          const productHasQueriedColor = productItem.colors.some(
            ({ color_id }) => color_id === lastQueriedColorID
          );
          if (productHasQueriedColor) {
            productItem.default_color_id = lastQueriedColorID;
          }
        }

        // set default color
        if (!productItem.default_color_id && productItem.colors[0]) {
          productItem.default_color_id = productItem.colors[0].color_id;
        }
        if (productItem.default_color_id) {
          productItem.default_color_slug =
            colorListHashIDsObj.data[productItem.default_color_id].slug;
        }

        // colros sort
        const defaultColorIndex = productItem.colors.findIndex(
          color => productItem.default_color_id === color.color_id
        );
        const defaultColorObj = productItem.colors[defaultColorIndex];
        if (!!defaultColorObj) {
          productItem.colors.splice(defaultColorIndex, 1);
          productItem.colors.unshift(defaultColorObj);
        }

        //handle if product in wishlist
        if (
          productsWishlistSlugs &&
          productsWishlistSlugs.includes(productItem.slug)
        ) {
          productItem['isWishlisted'] = true;
        }

        // handle product price
        productItem['price'] =
          productItem.price ||
          (productItem.sizes[0] && productItem.sizes[0].size_price);

        productItem['sort_index'] = Number(productItem['sort_index']);

        return productItem;
      })
      .sort((a, b) => a['sort_index'] - b['sort_index']);
  } catch (err) {
    throw err;
  }
};
