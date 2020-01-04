import bcrypt from "bcrypt";

import JWT from "utils/jwt";
import { select } from 'utils/db';
import { saveUserTokenSession } from 'session/user';

export default async (req) => {
  try {
    let result = await select({
      table: "email_user",
      fields: ["*"],
      condition: `email = '${req.body.email}'`
    });

    if(!result || !result[0]) {
      throw {
        errorMessage: 'user not found',
      }
    }

    const match = await bcrypt.compare(
      req.body.password,
      result[0].password
    );

    if (match) {
			result = result[0];
      delete result.password;

      const payload = {
        email: result.email,
        name: result.name,
        id: result.id
      };
      const token = JWT.sign(payload);
  
      req['user'] = payload;
      
      saveUserTokenSession(req, token);

      return result;
    } else {
      throw {
        statusCode: 400,
        errorMessage: "User not matched"
      };
    }
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
};