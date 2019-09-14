import filter from 'config/filter';

export const validQueryParams = [
  {
    param: 'price',
    validate: (val) => {
      const arr = val.split('-');
      return (arr[0] && arr[1] && arr[0] >= filter.lowPrice && arr[1] < filter.maxPrice && arr[0] < arr[1]) ? true : false;
    }
  },
  
]

export const validateFilterQuery = (query) => {
  for(const paramName of Object.keys(query)) {
    const matchedParam = validQueryParams.find(validParam => validParam.param === paramName);
    if(!matchedParam) {
      delete query[paramName];
    }
    else{
      !matchedParam.validate(query[paramName]) && delete query[paramName];
    }
  }
}