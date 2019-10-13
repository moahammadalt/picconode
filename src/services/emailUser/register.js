import bcrypt from "bcrypt";

import { insert, deleteRow } from "utils/db";
import JWT from "utils/jwt";
import { isEmail, isName } from 'globals/helpers';
import mailingTool from 'utils/mailing';
import config from 'config';

export default async (req) => {
  const userObj = req.body;
  if(userObj.password.length <= 6 || !isEmail(userObj.email) || !isName(userObj.name)) {
    throw {
      errorMessage: 'email, name or password are not valid'
    }
  }

  const hash = await bcrypt.hash(userObj.password, 10);
  userObj.password = hash;

  try {
    const response = await insert({
      table: "email_user",
      fields: Object.keys(userObj),
      values: Object.values(userObj),
      data: userObj
    });

    const payload = {
      name: userObj.name,
      email: userObj.email,
      id: response.id
    };
    
    const token = JWT.sign(payload);

    await mailingTool.sendEmail({
      fromMail: config.MAIL.contactUser,
      toMail: userObj.email,
      subject: 'piccoloveliero email verification',
      body: `<span>please click on this <a href="${req.protocol}://${req.headers.host}/emailUserRegisterVerification/${token}" target="_blank">link</a> to verify your email</span>`,
		});

    return {
      message: 'check your email please! confirmation email has been sent to your email.'
    };
  } catch (err) {
    console.log('err: ', err);
    if(err.DBError && err.DBError.code !== 'ER_DUP_ENTRY') {
      await deleteRow({
        table: 'email_user',
        fields: 'email',
        values: req.body.email,
      });

      throw {
        ...err,
      };
    }
    else {
      throw {
        ...err,
        errorMessage: 'this email is already exist, try another email',
      };
    }
    
  }
};