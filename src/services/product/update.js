import { update } from "utils/db";
import {
  productItemGet,
  productSizeItemGet,
  productSizeUpdate,
  productSizeCreate,
  productSizeDelete,
  productColorItemGet,
  productColorUpdate,
  productColorCreate,
  productColorDelete,
} from "services";

export default async (req) => {
  const { params } = req;
  const reqProductSizes = req.body.sizes;
  const reqProductColors = req.body.colors;
  const reqProductId = req.body.id;
	delete req.body.sizes;
  delete req.body.colors;
  let productBeforUpdate;
  
  try {

    productBeforUpdate = await productItemGet({ params });

    await update({
      table: "product",
      fields: Object.keys(req.body),
      values: Object.values(req.body),
      condition: `id = '${reqProductId}'`,
      data: req.body
    });
    req.body.sizes = reqProductSizes;
    req.body.colors = reqProductColors;

    const productSizes = await productSizeItemGet({
      body: { 'product_id': reqProductId}
    });

    const productColors = await productColorItemGet({
      body: { 'product_id': reqProductId}
    });

    if(reqProductSizes && Array.isArray(reqProductSizes) && reqProductSizes.length > 0) {

      for(const reqProductSizeObj of reqProductSizes) {
        const productSizeObj = productSizes.find(productSize => productSize['size_id'] === reqProductSizeObj.id);
        const isreqProductIdAndreqSizeIdExistInProductSizes = !!productSizeObj;
        
        if(!isreqProductIdAndreqSizeIdExistInProductSizes){
          if(!reqProductSizeObj.is_checked){
            continue;
          }
          await productSizeCreate({
						body: {
							'product_id': reqProductId,
							'size_id': reqProductSizeObj.id,
							'size_details': reqProductSizeObj.details,
							'amount': reqProductSizeObj.amount,
						}
          });
        }
        else{
          if(reqProductSizeObj.is_checked) {
            await productSizeUpdate({
              body: {
                'product_id': reqProductId,
                'size_id': reqProductSizeObj.id,
                'size_details': reqProductSizeObj.details,
                'amount': reqProductSizeObj.amount,
              }
            });
          }
          else {
            const deleteKey = 'id';
            await productSizeDelete({
              body: {
                [deleteKey]: productSizeObj.id,
              },
              key: deleteKey,
            });
          }
        }
      }
    }

    if(reqProductColors && Array.isArray(reqProductColors) && reqProductColors.length > 0) {

      for(const reqProductColorObj of reqProductColors) {
        const productColorObj = productColors.find(productColor => productColor['color_id'] === reqProductColorObj.id);
        const isreqProductIdAndreqColorIdExistInProductColors = !!productColorObj;

        if(!isreqProductIdAndreqColorIdExistInProductColors){
          if(!reqProductColorObj.is_checked){
            continue;
          }
          await productColorCreate({
						body: {
							'product_id': reqProductId,
							'color_id': reqProductColorObj.id,
							'amount': reqProductColorObj.amount,
						}
          });
        }
        else{
          if(reqProductColorObj.is_checked) {
            await productColorUpdate({
              body: {
                'product_id': reqProductId,
                'color_id': reqProductColorObj.id,
                'amount': reqProductColorObj.amount,
              }
            });
          }
          else {
            const deleteKey = 'id';
            await productColorDelete({
              body: {
                [deleteKey]: productColorObj.id,
              },
              key: deleteKey,
            });
          }
        }
      }
    }
  }
  catch (err) {
    await update({
      table: "product",
      fields: Object.keys(productBeforUpdate[0]),
      values: Object.values(productBeforUpdate[0]),
      condition: `slug = '${params.slug}'`,
      data: productBeforUpdate[0]
    });
		throw err;
  }
  
  return {
		...req.body,
	};

};
