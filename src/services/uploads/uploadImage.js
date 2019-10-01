import { readdirSync } from 'fs';
import path from 'path';
import config from 'config';

export default async req => {
  try {
    const imageFile = req.files.product_image;
    const imagesPath = path.resolve('.') + config.PUBLIC_IMAGES_PATH;
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

    return {
      image_link: fullImagePath,
      image_name: imageFileName
    }
  }
  catch (err) {
    throw err;
  }
};
