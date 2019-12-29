import { insert } from 'utils/db';

const emailSubscribe = async req => {
  try {
    const response = await insert({
      table: 'subscription',
      fields: Object.keys(req.body),
      values: Object.values(req.body),
      data: req.body
    });

    return {
      ...req.body,
      id: response.id,
    };
  }
  catch (err) {
    if(err.DBError && err.DBError.code === 'ER_DUP_ENTRY') {
      throw {
        errorMessage: 'This email has already been registered.',
      };
    }
    throw err;
  }
};

export default emailSubscribe;