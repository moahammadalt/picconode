import { deleteRow } from "utils/db";

import {
	productSizeDelete,
  productColorDelete,
  productItemGet,
  productImageDelete,
  productImageGet,
} from "services";

export default async (req) => {
  const { params } = req;
  
  const productItem = await productItemGet({ params });

  if(productItem.main_image) {
    const productImage = await productImageGet({
      body: {
        'product_id': productItem.id
      },
      key: 'product_id'
    });
    if(productImage && productImage[0]) {
      const imageDeleteKey = 'product_id';
      await productImageDelete({
        body: {
          [imageDeleteKey]: productItem.id
        },
        key: imageDeleteKey,
      });
    }
    
  }
  
  const deleteKey = 'id';

  if(productItem.sizes && productItem.sizes.length > 0) {
    const sizes = productItem.sizes.map(size => size.id);
    await productSizeDelete({
      body: {
        [deleteKey]: sizes
      },
      key: deleteKey,
    });
  }

  if(productItem.colors && productItem.colors.length > 0) {
    const colors = productItem.colors.map(color => color.id);
    await productColorDelete({
      body: {
        [deleteKey]: colors
      },
      key: deleteKey,
    });
  }

  return await deleteRow({
    table: 'product',
    fields: 'slug',
    values: req.params.slug,
    data: req.body
  });
};
