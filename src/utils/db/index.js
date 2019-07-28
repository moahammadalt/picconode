import { DBCon } from "loaders";

import { checkValue } from "globals/helpers";

const escapeResults = resultsArr => {

  if (!Array.isArray(resultsArr)) {
    return resultsArr;
  }
  const escapedResult = resultsArr.map(rowObj => {
    for (let key in rowObj) {
      if (typeof rowObj[key] === "string") {
        rowObj[key] = unescape(rowObj[key]);
      }
    }
    return rowObj;
  });

  return escapedResult;
};

export const select = async ({ table, fields, condition }) => {
  let fieldsNames = fields === "*" ? fields : fields.map((val, index) => val);

  let query = `SELECT ${fieldsNames} FROM ${table}`;

  if (condition) {
    query += ` WHERE ${condition}`;
	}
	
	try {
		const results = await DBCon.query(query);
    
    if(Array.isArray(results) && results.length === 0) {
			throw { errorMessage: 'no matched results' };
		}
		else{
			return escapeResults(results);
		}
	}
	catch (err) {
    throw {DBError: err};
	}
};

export const insert = async ({ table, fields, values, data }) => {
  let fieldsStr = "";
  let valuesStr = "";

  if (
    (typeof values[0] !== "object" && fields.length !== values.length) ||
    (typeof values[0] === "object" && fields.length !== values[0].length)
  ) {
    throw {
      errorMessage: 'some thing wrong in db input'
    };
  }

  let lastValues = [];
  fieldsStr += fields.map((val, index) => val);

  if (!Array.isArray(values[0])) {
    // one row
    values = values.map((val, index) => {
      valuesStr += index !== values.length - 1 ? ` ?,` : ` ?`;
      return !checkValue(val)
        ? null
        : typeof val === "boolean"
        ? val
        : escape(unescape(val));
    });
    lastValues = values;
  } else {
    // multiple rows [bulk]
    valuesStr = "?";
    values = values.map(
      (val, index) =>
        (val = val.map((str, index2) =>
          !checkValue(str)
            ? null
            : typeof str === "boolean"
            ? str
            : escape(unescape(str))
        ))
    );
    lastValues = [values];
  }

  let query = `INSERT INTO ${table} (${fieldsStr}) VALUES ${
    typeof values[0] !== "object" ? `(${valuesStr})` : `${valuesStr}`
  }`;

  try {
    const results = await DBCon.query(query, lastValues);
    data["id"] = results.insertId;
    return escapeResults(data);
  } catch (err) {
    throw {DBError: err};
  }

};

/* process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
}); 

process.on('uncaughtException', function(error) {
  console.log('uncaughtException at:', error)
 });*/