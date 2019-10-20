import bcrypt from "bcrypt";

import { update, select } from "utils/db";
import JWT from "utils/jwt";
import { saveUserTokenSession } from 'session/user';
import { getPasswordResetCode, deletePasswordResetCode } from 'session/passwordResetCode';

export default async (req) => {
  try {
    const savedResetCode = getPasswordResetCode(req);

    if(!savedResetCode || savedResetCode !== req.body.resetCode) {
      throw {
        errorMessage: 'reset code is not correct or expired.',
      }
    }
    
    let savedUser = await select({
      table: "email_user",
      fields: ["*"],
      condition: `email = '${req.body.email}'`
    });

    if(!savedUser || !savedUser[0]) {
      throw {
        errorMessage: 'user not found.',
      }
    }

    if(req.body.newPassword.length <= 6 || savedUser[0].email !== req.body.email) {
      throw {
        errorMessage: 'password or email is not valid.'
      }
    }

    const encryptedPassword = await bcrypt.hash(req.body.newPassword, 10);

    await update({
      table: 'email_user',
      fields: ['password'],
      values: [encryptedPassword],
      condition: `id = '${savedUser[0].id}'`,
    });

    const payload = {
      email: savedUser[0].email,
      name: savedUser[0].name,
      id: savedUser[0].id
    };
    const token = JWT.sign(payload);
    
    saveUserTokenSession(req, token);
    deletePasswordResetCode(req);

    return {
      message: 'your password has been reseted.'
    };
    
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
};