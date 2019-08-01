import { update } from "utils/db";
import {
  productSizeItemGet,
	productItemGet,
  productSizeUpdate,
  productSizeCreate,
  productSizeDelete,
} from "services";

export default async (req) => {
  const { params } = req;
  const reqProductSizes = req.body.sizes;
  const reqProductCategories = req.body.categories;
  const reqProductId = req.body.id;
	delete req.body.sizes;
  delete req.body.categories;
  let productBeforUpdate;
  let productAfterUpdate;
  
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
    
    const productAfterUpdateArr = await productItemGet({ params });
    productAfterUpdate = productAfterUpdateArr[0];

    const productSizes = await productSizeItemGet({
      body: { 'product_id': reqProductId}
    });
    

    if(reqProductSizes && Array.isArray(reqProductSizes) && reqProductSizes.length > 0) {

      for(const reqProductSizeObj of reqProductSizes) {
        const productSizeObj = productSizes.find(productSize => productSize['size_id'] === reqProductSizeObj.id && productSize['product_id'] === reqProductId);
        const isreqProductIdAndreqSizeIdExistInproductSizes = !!productSizeObj;
        
        
        if(!isreqProductIdAndreqSizeIdExistInproductSizes){
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
            await productSizeDelete({
              body: {
                'id': productSizeObj.id,
              }
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
  

  /* try {
    if(productSizes && Array.isArray(productSizes)) {
      req.body.sizes = [];
      const sizes = await sizeListGet();

      for(const reqProductSizeObj of productSizes) {
        const sizeObject = sizes.find(size => size.slug.toLowerCase() === reqProductSizeObj.size.toLowerCase());
        if(sizeObject) {
          const productSizeRecord = await productSizeCreate({
            body: {
              'product_id': productResponse.id,
              'size_id': sizeObject.id,
              'size_details': reqProductSizeObj.details,
              'amount': reqProductSizeObj.amount,
            }
          });
          
          req.body.sizes.push(reqProductSizeObj);
        }
      }
    }
  }

  catch (err) {
		await productDelete({
			params: {
				'slug': productResponse.slug
			}
		});
		throw err;
	}

	return {
		...req.body,
		id: productResponse.id,
	}; */

};
