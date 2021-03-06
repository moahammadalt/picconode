import { insert } from 'utils/db';
import mailingTool from 'utils/mailing';
import config from 'config';

const userDemandSend = async (req) => {
  try {
    const response = await insert({
      table: 'user_demand',
      fields: Object.keys(req.body),
      values: Object.values(req.body),
      data: req.body
    });

    const { product_id } = req.body;

    const toServerMail = product_id
      ? config.MAIL.salesUser
      : config.MAIL.contactUser;
      
    const subject = product_id ? 'Product Request' : req.body.subject;
    const productLink = product_id && req.protocol + '://' + req.headers.host + '/' + product_id;
    
    const message = `
      <div>
        <b>-from mr/ms: </b>${req.body.name}<br />
        <b>-with email: </b>${req.body.email}<br />
        ${
          product_id
            ? `<b>-asking about <a href=${productLink} target="_blank" >product</a> </b><br />`
            : `<b>-with phone number: </b>${req.body.phone}<br />`
        }
        <b>-with a message: </b>
        <br />${req.body.message}<br />
      </div>
    `;

  
    await mailingTool.sendEmail({
      fromMail: req.body.email,
      toMail: toServerMail,
      subject: subject,
      body: message,
    });
    
    return {
      ...req.body,
      id: response.id
    };
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
};

export default userDemandSend;