import { readdirSync } from 'fs';
import sharp from 'sharp';
import path from 'path';
import config from 'config';

export default async req => {
  try {
    const imageFile = req.files.product_image;
    const imagesPath = path.resolve('.') + config.PUBLIC_IMAGES_PATH;
    const thumbnailImagesPath = path.resolve('.') + config.PUBLIC_THUMBNAIL_IMAGES_PATH;
    const smallImagesPath = path.resolve('.') + config.PUBLIC_SMALL_IMAGES_PATH;

    imageFile.name = imageFile.name.replace(/\s+/g, '-').toLowerCase();
    let imagesArr = [];

    readdirSync(imagesPath).forEach(file => {
      imagesArr.push(file);
    });

    let i = 1;
    let imageFileName = '';
    if (imagesArr.indexOf(imageFile.name) === -1) {
      imageFileName = imageFile.name;
    } else {
      while (i !== 0) {
        if (imagesArr.indexOf(`${i}${imageFile.name}`) === -1) {
          imageFileName = `${i}${imageFile.name}`;
          i = 0;
        } else {
          i++;
        }
      }
    }

    await imageFile.mv(imagesPath + imageFileName);

    const fullImagePath = config.PUBLIC_IMAGES_LINK + imageFileName;


    const imageDimension = await sharp(imagesPath + imageFileName).metadata();    

    // create thumbnail image
    await sharp(imagesPath + imageFileName).resize({
      width: Math.round(imageDimension.width / config.THUMBNAIL_IMAGE_SIZE_CONVERSION.width),
      height: Math.round(imageDimension.height / config.THUMBNAIL_IMAGE_SIZE_CONVERSION.height),
    }).jpeg({
      quality: 100,
    }).toFile(thumbnailImagesPath + config.THUMBNAIL_IMAGE_PREFIX + imageFileName);

    // create small image
    await sharp(imagesPath + imageFileName).resize({
      width: Math.round(imageDimension.width / config.SMALL_IMAGE_SIZE_CONVERSION.width),
      height: Math.round(imageDimension.height / config.SMALL_IMAGE_SIZE_CONVERSION.height),
    }).jpeg({
      quality: 100,
    }).toFile(smallImagesPath + config.SMALL_IMAGE_PREFIX + imageFileName);

    return {
      image_link: fullImagePath,
      image_name: imageFileName
    }
  }
  catch (err) {
    console.log('err: ', err);
    throw err;
  }
};
