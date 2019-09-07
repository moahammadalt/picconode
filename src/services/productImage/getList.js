import { select } from 'utils/db';

export default async (req) => {
  
  let productColorImageList = await select({
    table: 'product_color_image',
  });

  productColorImageList = productColorImageList.map(productColorImage => {
    productColorImage['image_link'] = (req.headers && req.headers.host) ? ('/images/' + productColorImage.image_name) : null;
		return productColorImage;
  });
  return productColorImageList;
};