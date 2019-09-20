import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import path from 'path';
import hbs from 'hbs';
import mysqlSession from 'express-mysql-session';

import api from 'api';
import { eventHandler, events } from 'eventsObj/eventHandler';

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
    
    eventHandler.on(events.DBConnectionCreated, (DBcon) => {

      var MySQLStore = mysqlSession(session);

      var sessionStore = new MySQLStore({}, DBcon);

      this.app.use(session({
        secret: config.SESSION_SECRET,
        resave: true,
        store: sessionStore,
        saveUninitialized: true,
        cookie: {
          expires: false,
        }
      }));

      	//middleware
      this.app.use('/adminAPI', adminAPIAuth);
      this.app.use('/', apiExistParamsValidation);

      this.app.use(api());

      // global error handling middleware
      this.app.use((err, req, res, next) => {
        console.log('err is: ', err); // to see properties of message in our console
        res.status(422).send(err.message ? err.message : err);
      });
    });
  }

  connect(port) {
    this.port = port || config.PORT;

    this.hostname = config.HOSTNAME;

    this.app.listen(this.port, this.hostname, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
})();
