import { deleteRow } from 'utils/db';

import { sizeListGet } from 'services';
import { createHash } from 'globals/helpers';

export default async req => {
  try {
    const sizeList = await sizeListGet();
    const sizesHash = createHash(sizeList, 'slug');

    if (!sizesHash.data[req.params.slug]) {
      throw {
        errorMessage: 'size is not exist'
      };
    }

    await deleteRow({
      table: 'size',
      fields: 'slug',
      values: req.params.slug,
    });

    return {
      message: `size ${req.params.slug} has been deleted`
    }
  } catch (err) {
    throw err;
  }
};
