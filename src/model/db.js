import { DBCon } from 'loaders';

import { responseStatuses } from 'globals/constans';
import { handleDBError, checkValue } from 'globals/helpers';

const escapeResults = resultsArr => {
	//console.log('resultsArr', resultsArr);

	if(!Array.isArray(resultsArr)) {
		return resultsArr;
	}
	const escapedResult = resultsArr.map(rowObj => {
		for(let key in rowObj){
			if(typeof rowObj[key] === 'string'){
				rowObj[key] = unescape(rowObj[key]);
			}
		}
		return rowObj;
	});
	
	return escapedResult;
};

const sendSuccessResponse = result => ({
	status: responseStatuses.success,
	result
});

const sendFailureResponse = error => {
	throw ({
		status: responseStatuses.fail,
		errorMessage: handleDBError(error)
	})
};

export const select = async ({ table, fields, condition }) => {
	let fieldsNames = '';
	fieldsNames = fields.map((val, index) => val);

	let query = fields ? `SELECT ${fieldsnames} FROM ${table}` : `SELECT * FROM ${table}`;

	if(condition){
		query += ` WHERE ${condition}`;
	}

	await DBCon.query(query, (error, results)=>{
		if(error){
			DBCon.destroy();
			return sendFailureResponse(error);
		}
		else {
			return sendSuccessResponse(results);
		}
	});
};


export const insert = async ({ table, fields, values }) => {
	let fieldsStr = '';
	let valuesStr = '';

	if((typeof values[0] !== 'object' && fields.length !== values.length) ||
		(typeof values[0] === 'object' && fields.length !== values[0].length)){
		return sendFailureResponse(error);
	}
	
	let lastValues = [];
	fieldsStr += fields.map((val, index) => val);

	console.log('fieldsStr', fieldsStr);

	if(!Array.isArray(values[0])){ // one row
		values = values.map((val, index) => {
			valuesStr += (index !== values.length - 1) ? ` ?,` : ` ?`;
			return (!checkValue(val)) ? null : (typeof val === 'boolean') ? val : escape(unescape(val));
		});
		lastValues = values;
	}
	else{  // multiple rows [bulk]
		valuesStr = '?';
		values = values.map((val, index) => val = val.map((str, index2) => (!checkValue(str)) ? null : (typeof str === 'boolean') ? str : escape(unescape(str))));
		lastValues = [values];
	}

	let query = `INSERT INTO ${table} (${fieldsStr}) VALUES ${typeof values[0] !== 'object' ? `(${valuesStr})` : `${valuesStr}`}`;

	try {
		const results = await DBCon.query(query, lastValues);
		//console.log('a', results)
		return sendSuccessResponse(results);
	}
	catch (err) {
		//console.log('ssssss')
		DBCon.destroy();
		sendFailureResponse(err);
	}

	/* return DBCon.query(query, lastValues, (error, results, fields)=>{
		console.log('a', 1)
		if(error){
			DBCon.destroy();
			return sendFailureResponse(error);
		}
		else {
			//this.data.push(tmp_res);
			return sendSuccessResponse(results);
		}
	}); */
};