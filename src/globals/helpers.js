export const checkValue = (value, key) => {

	value = key ? key.split(".").reduce( (o, x) => (typeof o == "undefined" || o === null) ? o : o[x] , value) : value;
	return ((!value && value !== false) || /^\s*$/.test(value)) ? false : true;
};

export const sendClientAlarm = (msg) => {

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
		<h3>${msg || `Generic error happened, please contact the admin!`}</h3>
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

export const createHash = (arr, key) => {
  var Hash = function () {
    this.data = {};
    if (arr && Array.isArray(arr)) {
      arr.map((o) => {
        this.data[o[key]] = o;
      });
      this.size = arr.length;
    }
    else {
      this.size = 0;
    }
  };
  Hash.prototype.keys = function () {
    return Object.keys(this.data);
  }
  Hash.prototype.values = function () {
    return Object.values(this.data);
  }

  return new Hash();
};

export const getParentChildArr = (arr, parentIdKey) => {
  var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for(var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id]['children'] = [];
  }


  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem[parentIdKey|| 'parent_id']) {
        mappedArr[mappedElem[parentIdKey || 'parent_id']]['children'].push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

