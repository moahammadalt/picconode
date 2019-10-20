import { select } from 'utils/db';
import mailingTool from 'utils/mailing';
import config from 'config';
import { savePasswordResetCode } from 'session/passwordResetCode';

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

    const resetCode = [...Array(5).keys()].map(n => Math.round(Math.random() * 10)).join('');

    savePasswordResetCode(req, resetCode);

    await mailingTool.sendEmail({
      fromMail: config.MAIL.contactUser,
      toMail: req.body.email,
      subject: 'piccoloveliero password reset code',
      body: `your password reset code is ${resetCode}`,
		});

    return {
      message: 'check your email please! password reset code has been sent to your email.'
    };

  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
};