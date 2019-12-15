import { deleteRow } from 'utils/db';

import { colorListGet } from 'services';
import { createHash } from 'globals/helpers';

export default async req => {
  try {
    const colorList = await colorListGet();
    const colorsHash = createHash(colorList, 'slug');

    if (!colorsHash.data[req.params.slug]) {
      throw {
        errorMessage: 'color is not exist'
      };
    }

    await deleteRow({
      table: 'color',
      fields: 'slug',
      values: req.params.slug,
    });

    return {
      message: `color ${req.params.slug} has been deleted`
    }
  } catch (err) {
    throw err;
  }
};
