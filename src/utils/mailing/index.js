import nodemailer from'nodemailer';
import config from  'config';

export default new (class mailingTool{

	constructor(){
		// singleton
    if (!!mailingTool.instance) {
      return mailingTool.instance;
    }
    mailingTool.instance = this;
  }

  static initializer () {
    return nodemailer.createTransport({
			host: config.MAIL.host,
      port: config.MAIL.port,
      auth: {
        user: config.MAIL.mainUserName,
        pass: config.MAIL.mainUserPassword
      }
    });
  }

  async sendEmail({ fromMail, toMail, subject, body } = {}){
    if(!this.mailer) {
      this.mailer = await this.constructor.initializer();
    }

    const checkIfHtml = /<[a-z][\s\S]*>/i.test(body);

    const mailOptions = {
			from: fromMail,
			to: toMail,
      subject: subject,
			[checkIfHtml ? 'html' : 'text']: body,
    };

    return new Promise((resolve, reject) => {
      this.mailer.sendMail(mailOptions, (error, response) => {
        if (error) { reject(error); }
        else {
          this.mailer.close();
          console.log('Email sent to: ' + response);
          resolve(response);
        }
      });
    });
  }

})();