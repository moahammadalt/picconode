import { deleteRow } from "utils/db";
import { getParentChildArr } from 'globals/helpers';
import { responseStatuses } from 'globals/constants';
import { productItemGet } from 'services';

export default async ({params}) => {
  

  const productItem = await productItemGet({ params });
  

  return {
    product: {
      ...productItem,
    }
  }
};
