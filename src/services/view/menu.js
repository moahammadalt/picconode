import { deleteRow } from "utils/db";
import { getParentChildArr } from 'globals/helpers';
import { categoryListGet } from 'services';

export default async () => {
  
  const categoriesList = getParentChildArr(await categoryListGet());

  return {
    categories: {
      ...categoriesList
    }
  }
};
