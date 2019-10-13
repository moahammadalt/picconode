import { productListGet } from 'services';

export default async req => {

  try {

    const bestProductsList = await productListGet({
      ...req,
      query: {
        orderBy:  req.query.orderBy || 'date_created',
        sort: req.query.sort || 'DESC',
      },
      condition: `is_best=1`,
    });

    console.log('bestProductsList', bestProductsList.length);

    return { bestProductsList };
    
  }
  catch (err) {
    console.log('err', err);
  }
};
