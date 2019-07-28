import mysql from "mysql";
import { promisify } from "util";

import config from "config";

export default new (class databaseCon {
  constructor() {
    // singleton
    if (!!databaseCon.instance) {
      return databaseCon.instance;
    }
    databaseCon.instance = this;

    this.con = mysql.createConnection({
      host: config.DB.host,
      user: config.DB.user,
      password: config.DB.password,
      database: config.DB.name
    });

    this.con.query = promisify(this.con.query);

    return this.con;
  }

  connect() {
    this.con.connect(err => {
      if (err) throw err;
      console.log("Connected!");
    });
  }
})();
