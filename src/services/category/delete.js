import { deleteRow } from 'utils/db';

import { categoryListGet } from 'services';
import { createHash } from 'globals/helpers';

export default async req => {
  try {
    const categoryList = await categoryListGet();
    const categoriesHash = createHash(categoryList, 'slug');

    if (!categoriesHash.data[req.params.slug]) {
      throw {
        errorMessage: 'category is not exist'
      };
    }

    const requestedCategoryId = categoriesHash.data[req.params.slug].id;

    const requestedCategoryHasChildCategories = () =>
      categoriesHash
        .values()
        .some(category => category.parent_id === requestedCategoryId);

    if (requestedCategoryHasChildCategories()) {
      throw {
        errorMessage:
          'This category has children categories, delete its children first'
      };
    }

    await deleteRow({
      table: 'category',
      fields: 'slug',
      values: req.params.slug,
    });

    return {
      message: `category ${req.params.slug} has been deleted`
    }
  } catch (err) {
    throw err;
  }
};
