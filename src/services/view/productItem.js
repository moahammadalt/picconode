import { deleteRow } from "utils/db";
import { getParentChildArr } from 'globals/helpers';
import { responseStatuses } from 'globals/constants';
import { productItemGet } from 'services';

export default async ({params}) => {
  console.log('params: ', params);

  const productItem = await productItemGet({ params });
  console.log('productItem: ', productItem);

  return {
    product: {
      ...productItem,
    }
  }
};
