import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import hbs from 'hbs';

import api from 'api';

import config from 'config';
import { apiExistParamsValidation, adminAPIAuth } from 'middlewares';

export default new (class expressServer {
  constructor() {
    // singleton
    if (!!expressServer.instance) {
      return expressServer.instance;
    }
    expressServer.instance = this;

    this.app = express();
    this.app.set('view engine', 'html');
    this.app.engine('html', hbs.__express);
    this.app.use(express.static(path.join(path.resolve('.'), config.PUBLIC_VIEW_PATH)));
    this.app.use(express.static(config.PUBLIC_STATIC_PATH));
    this.app.use(fileUpload());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
	
		//middleware
		this.app.use('/adminAPI', adminAPIAuth);
    this.app.use('/', apiExistParamsValidation);

    this.app.use(api());

    // global error handling middleware
    this.app.use((err, req, res, next) => {
      console.log('err is: ', err); // to see properties of message in our console
      res.status(422).send(err.message ? err.message : err);
    });
  }

  connect(port) {
    if (!this.port) {
      this.port = port || config.PORT;
    }

    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
})();
