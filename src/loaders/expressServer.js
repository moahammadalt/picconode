import express from "express";
import bodyParser from "body-parser";
import path from "path";
import expressValidator from "express-validator";
import config from "config";
import hbs from "hbs";
import api from 'api';

export default new (class expressServer {
  constructor() {
    // singleton
    if (!!expressServer.instance) {
      return expressServer.instance;
    }
    expressServer.instance = this;

    this.app = express();

    this.app.set("view engine", "html");
    this.app.engine("html", hbs.__express);
    this.app.use(express.static(path.join(path.resolve("."), "/src/views")));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
		//this.app.use(expressValidator();
		
		this.app.use(api());

    // global error handling middleware
    this.app.use((err, req, res, next) => {
      console.log(err); // to see properties of message in our console
      res.status(422).send(err.message ? err.message : err);
    });
  }

  connect(port) {
    if (!this.port) {
      this.port = port || config.port;
    }

    this.app.listen(this.port, () => {
      console.log(`listening on port ${this.port}`);
    });
  }
})();
