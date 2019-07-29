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
  let fieldsNames = fields === '*' || !fields ? '*' : fields.map((val, index) => val);

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

  fieldsStr += fields.map((val, index) => val);

  // TODO: support bulk inserts
  values = values.map((val, index) => {
    valuesStr += index !== values.length - 1 ? ` ?,` : ` ?`;
    return !checkValue(val)
      ? null
      : typeof val === "boolean"
      ? val
      : escape(unescape(val));
  });

  let query = `INSERT INTO ${table} (${fieldsStr}) VALUES ${
    typeof values[0] !== "object" ? `(${valuesStr})` : `${valuesStr}`
  }`;

  try {
    const results = await DBCon.query(query, values);
    data["id"] = results.insertId;
    return escapeResults(data);
  } catch (err) {
    throw { DBError: err };
  }

};

export const update = async ({ table, fields, values, condition, data }) => {

  // TODO: add bulk update support
  let query = '';
  if(typeof fields !== 'string'){
    let str = '';
    str += fields.map((val, index) => ` ${val}=${((!checkValue(values[index])) ? null : (typeof values[index] === 'boolean') ? values[index] : `'${escape(unescape(values[index]))}'`)}`);
    query = `UPDATE ${table} SET ${str} WHERE ${condition}`;
  }
  else{
    query = fields;
  }

  try {
    const results = await DBCon.query(query);
    if(results.affectedRows === 0) {
      throw { errorMessage: 'category not found' };
    }
    return escapeResults(results);
  }
  catch (err) {
    throw { DBError: err };
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