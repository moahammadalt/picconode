import mysql from 'mysql';

import config from "config";

export default new (class databaseCon {
  constructor() {
    // singleton
    if (!!databaseCon.instance) {
      return databaseCon.instance;
    }
    databaseCon.instance = this;

    this.con = mysql.createConnection({
			host: config.db.host,
			user: config.db.user,
			password: config.db.password,
			database: config.db.name,
    });
  }

  connect() {
    this.con.connect(err => {
			if (err) throw err;
			console.log("Connected!");
		});
  }
})();
