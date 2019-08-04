import { select } from 'utils/db';
import config from 'config';
import path from 'path';

export default async (req) => {
  
  const imagesPath = path.resolve('.') + config.PUBLIC_IMAGES_PATH;

  let productColorImageList = await select({
    table: 'product_color_image',
  });

  productColorImageList = productColorImageList.map(productColorImage => {
    productColorImage['image_link'] = (req.headers && req.headers.host) ? (req.headers.host + imagesPath + productColorImage.image_name) : null;
		return productColorImage;
  });
  return productColorImageList;
};