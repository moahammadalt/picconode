import { select } from 'utils/db';
import config from 'config';

export default async (req) => {
  
  let productColorImageList = await select({
    table: 'product_color_image',
    ...req.query,
  });

  productColorImageList = productColorImageList.map(productColorImage => {
    productColorImage['image_link'] = (req.headers && req.headers.host) ? (config.PUBLIC_IMAGES_LINK + productColorImage.image_name) : null;
    
    productColorImage['small_image_name'] = config.SMALL_IMAGE_PREFIX + productColorImage.image_name;
    productColorImage['small_image_link'] = (req.headers && req.headers.host) ? (config.PUBLIC_SMALL_IMAGES_LINK + productColorImage.small_image_name) : null;

    productColorImage['thumbnail_image_name'] = config.THUMBNAIL_IMAGE_PREFIX + productColorImage.image_name;
    productColorImage['thumbnail_image_link'] = (req.headers && req.headers.host) ? (config.PUBLIC_THUMBNAIL_IMAGES_LINK + productColorImage.thumbnail_image_name) : null;
            
		return productColorImage;
  });
  return productColorImageList;
};