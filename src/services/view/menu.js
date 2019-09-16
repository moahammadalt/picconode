import { createHash } from 'globals/helpers';
import { getParentChildArr } from 'globals/helpers';
import { categoryListGet } from 'services';

export default async () => {
  
  const categoriesList = getParentChildArr(await categoryListGet());

  return {
    categoriesHash: createHash(categoriesList, 'slug')
  }
};
