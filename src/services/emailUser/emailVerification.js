import { update } from "utils/db";
import JWT from "utils/jwt";
import { saveUserTokenSession } from 'session/user';

export default async (req) => {
  
  let userId;
  try {

    const token = req.params.token;
    const decodedUser = await JWT.verify(token);
    userId = decodedUser.id;

    if(!token || !decodedUser) {
      throw {
        errorMessage: 'token is not valid',
      }
    }

		req['user'] = decodedUser;
    
    saveUserTokenSession(req, token);

    await update({
      table: 'email_user',
      fields: ['verified'],
      values: ['1'],
      condition: `id = '${userId}'`,
    });

    return {
      user: req.user,
    }

  } catch (err) {
    console.log('err: ', err);

    await update({
      table: 'email_user',
      fields: ['verified'],
      values: ['0'],
      condition: `id = '${userId}'`,
    });

    throw err;
  }
};