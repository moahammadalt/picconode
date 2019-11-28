import { deleteRow } from "utils/db";

import {
	productSizeDelete,
  productColorDelete,
  productItemGet,
  productImageDelete,
  productImageGet,
} from "services";

export default async (req) => {
  try {
  
  const { params } = req;
  
  const productItem = await productItemGet({ params, ignoreErrorRender: true });
  
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

  if(productItem.colors && productItem.colors.length > 0) {
    const colors = productItem.colors.map(color => color.id);
    await productColorDelete({
      body: {
        [deleteKey]: colors
      },
      key: deleteKey,
    });
  }

  const deletedRecord = await deleteRow({
    table: 'product',
    fields: 'slug',
    values: req.params.slug,
    data: req.body
  });

  return { ...deletedRecord, deletedProductSlug: req.params.slug };
}
catch( err ) {
  console.log('err: ', err);
}
};
