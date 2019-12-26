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
  productImageCreate,
  productImageDelete,
  productImageGet,
} from "services";

export default async (req) => {
  const { params } = req;
  const reqProductSizes = req.body.sizes;
  const reqProductColors = req.body.colors;
  const reqProductId = req.body.id;
  let reqProductMainImage = req.body.main_image;
  let productBeforUpdate;
	delete req.body.sizes;
  delete req.body.colors;
  delete req.body.images;
  delete req.body.category_name;
  delete req.body.category_type_name;
  delete req.body.category_tag_name;
  delete req.body.link;

  if(reqProductMainImage) {
    req.body.main_image = reqProductMainImage.image_name;
  }
  try {

    productBeforUpdate = await productItemGet({ params, ignoreErrorRender: true });
    
    if(reqProductMainImage && reqProductMainImage.image_name){
      if(productBeforUpdate.main_image) {
        if(productBeforUpdate.main_image.image_name !== reqProductMainImage.image_name) {
          const imageDeleteKey = 'image_name';
          await productImageDelete({
            body: {
              [imageDeleteKey]: productBeforUpdate.main_image.image_name
            },
            key: imageDeleteKey,
          });
          const mainImageCreated = await productImageCreate({
            ...req,
            body: {
              'product_id': productBeforUpdate.id,
              'image_name': reqProductMainImage.image_name
            }
          });
          reqProductMainImage = mainImageCreated;
        }
      }
      else {
        const mainImageCreated = await productImageCreate({
          ...req,
          body: {
            'product_id': productBeforUpdate.id,
            'image_name': reqProductMainImage.image_name
          }
        });
        reqProductMainImage = mainImageCreated;
        req.body.main_image = mainImageCreated.image_name;
      }
    }
    req.body.sort_index = req.body.sort_index || req.body.id;
    await update({
      table: 'product',
      fields: Object.keys(req.body),
      values: Object.values(req.body),
      condition: `id = '${reqProductId}'`,
      data: req.body
    });
    req.body.sizes = reqProductSizes;
    req.body.colors = reqProductColors;
    req.body.main_image = reqProductMainImage;

    const productSizes = await productSizeItemGet({
      body: { 'product_id': reqProductId}
    });

    const productColors = await productColorItemGet({
      body: { 'product_id': reqProductId}
    });

    if(reqProductSizes && Array.isArray(reqProductSizes) && reqProductSizes.length > 0) {

      for(const reqProductSizeObj of reqProductSizes) {
        const productSizeObj = productSizes.find(productSize => productSize['size_id'] === reqProductSizeObj.id);
        const isReqProductIdAndReqSizeIdExistInProductSizes = !!productSizeObj;
        if(reqProductSizeObj.refId) {
          await productSizeUpdate({
            body: {
              'product_id': reqProductId,
              'size_id': reqProductSizeObj.id,
              'size_details': reqProductSizeObj.details,
              'height': reqProductSizeObj.height,
              'chest': reqProductSizeObj.chest,
              'waistline': reqProductSizeObj.waistline,
              'hips': reqProductSizeObj.hips,
              'size_price': reqProductSizeObj.size_price,
              'amount': reqProductSizeObj.amount,
            },
            condition: `id = ${reqProductSizeObj.refId}`,
          });
          continue;
        }
        
        if(!isReqProductIdAndReqSizeIdExistInProductSizes){
          if(!reqProductSizeObj.is_checked){
            continue;
          }
          await productSizeCreate({
						body: {
							'product_id': reqProductId,
							'size_id': reqProductSizeObj.id,
              'size_details': reqProductSizeObj.details,
              'height': reqProductSizeObj.height,
							'chest': reqProductSizeObj.chest,
              'waistline': reqProductSizeObj.waistline,
              'hips': reqProductSizeObj.hips,
              'size_price': reqProductSizeObj.size_price,
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
                'height': reqProductSizeObj.height,
                'chest': reqProductSizeObj.chest,
                'waistline': reqProductSizeObj.waistline,
                'hips': reqProductSizeObj.hips,
                'size_price': reqProductSizeObj.size_price,
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

        if(reqProductColorObj.refId) {
          await productColorUpdate({
            body: {
              'color_id': reqProductColorObj.id,
              'amount': reqProductColorObj.amount,
              'product_color_code': reqProductColorObj.product_color_code,
            },
            condition: `id = ${reqProductColorObj.refId}`,
          });
          continue;
        }

        if(!isreqProductIdAndreqColorIdExistInProductColors){
          if(!reqProductColorObj.is_checked){
            continue;
          }
          const productColorCreated = await productColorCreate({
						body: {
							'product_id': reqProductId,
							'color_id': reqProductColorObj.id,
              'amount': reqProductColorObj.amount,
              'product_color_code': reqProductColorObj.product_color_code,
						}
          });

          if(Array.isArray(reqProductColorObj.images)) {
            for(const reqProductColorImage of reqProductColorObj.images) {
              await productImageCreate({
                ...req,
                body: {
                  'product_color_id': productColorCreated.id,
                  'product_id': reqProductId,
                  'image_name': reqProductColorImage.image_name,
                }
              });
            }
          }
        }
        else{
          const imageKey = 'product_color_id';
          const productColorImages = await productImageGet({
            body: {
              [imageKey]: productColorObj.id,
            },
            key: imageKey
          });
          if(productColorImages && productColorImages[0]) {
            await productImageDelete({
              body: {
                [imageKey]: productColorObj.id,
              },
              key: imageKey,
            });
          }

          if(reqProductColorObj.is_checked) {
            await productColorUpdate({
              body: {
                'product_id': reqProductId,
                'color_id': reqProductColorObj.id,
                'amount': reqProductColorObj.amount,
                'product_color_code': reqProductColorObj.product_color_code,
              }
            });
            if(Array.isArray(reqProductColorObj.images)) {
              for(const reqProductColorImage of reqProductColorObj.images) {
                await productImageCreate({
                  ...req,
                  body: {
                    'product_color_id': productColorObj.id,
                    'product_id': reqProductId,
                    'image_name': reqProductColorImage.image_name
                  }
                });
              }
            }
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

    return {
      ...req.body,
    };
  }
  catch (err) {
    console.log('err: ', err);
    productBeforUpdate.main_image = productBeforUpdate.main_image && productBeforUpdate.main_image.image_name;
    delete productBeforUpdate.category;
    delete productBeforUpdate.category_type;
    delete productBeforUpdate.category_tag;
    delete productBeforUpdate.colors;
    delete productBeforUpdate.sizes;
    delete productBeforUpdate.link;
    await update({
      table: "product",
      fields: Object.keys(productBeforUpdate),
      values: Object.values(productBeforUpdate),
      condition: `slug = '${params.slug}'`,
      data: productBeforUpdate
    });
		throw err;
  }
};
