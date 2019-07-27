export const checkValue = (value, key) => {

	value = key ? key.split(".").reduce( (o, x) => (typeof o == "undefined" || o === null) ? o : o[x] , value) : value;
	return ((!value && value !== false) || /^\s*$/.test(value)) ? false : true;
};

export const sendClientAlarm = (msg) => {
  
	if(msg == '404'){
	  msg = `Oop's, page not found!`;
	}
	return `
	  <div 
		style="
		  width: 50%;
		  height: auto;
		  margin: auto;
		  text-align: center;
		  padding: 20px;
		  margin-top: 70px;
		  font-family: sans-serif !important;
		  background-color: #272c33;
		  color: #fff;">
		<h3>${msg}</h3>
	  </div>
	`;
};

export const handleMissedParamsError = (errors) => `${errors.map(param => `<br />-[${param}] should not be empty`)}`;

export const handleDBError = (errorObj) => {

  if(!errorObj || (errorObj !== undefined && Object.keys(errorObj).length === 0) || errorObj === ''){
  	return 'empty result';
  }
  else if(errorObj !== undefined && (errorObj.sqlMessage !== undefined || errorObj.sqlMessage !== '')){
  	return `Error: ${errorObj.sqlMessage}`;
  }
  else{
  	return 'Server Error';
  }
};
