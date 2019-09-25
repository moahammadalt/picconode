import { insert } from 'utils/db';

export const emailSubscribe = async req => {

  const response = await insert({
    table: 'subscription',
    fields: Object.keys(req.body),
    values: Object.values(req.body),
    data: req.body
  });

  return {
    ...req.body,
    id: response.id
  };
};