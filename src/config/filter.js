export const lowPrice = 0;

export const maxPrice = 4000;

export const getValidQueryParams = ({
  availablesColorsSlugs,
  availablesSizesSlugs,
  flattenCategoriesHash
} = {}) => [
  {
    param: 'category',
    isSingle: true,
    validate: val => flattenCategoriesHash.keys().includes(val)
  },
  {
    param: 'type',
    isSingle: true,
    validate: val => flattenCategoriesHash.keys().includes(val)
  },
  {
    param: 'tag',
    isSingle: true,
    validate: val => flattenCategoriesHash.keys().includes(val)
  },
  {
    param: 'price',
    validate: val => {
      const priceArr = val.split('-').map(num => Number(num));
      return (
        (priceArr[0] || priceArr[0] === 0) &&
        priceArr[1] &&
        priceArr[0] >= lowPrice &&
        priceArr[1] <= maxPrice &&
        priceArr[0] < priceArr[1]
      );
    }
  },
  {
    param: 'color',
    validate: val => {
      const colorArr = val.split(',');
      return availablesColorsSlugs.some(color => colorArr.includes(color));
    }
  },
  {
    param: 'size',
    validate: val => {
      const sizeAarr = val.split(',');
      return availablesSizesSlugs.some(size => sizeAarr.includes(size));
    }
  }
];

export const getSinglurQueryParams = () =>
  getValidQueryParams()
    .filter(({ isSingle }) => isSingle)
    .map(({ param }) => param);

export const getFilterFieldsObjNames = () =>  getValidQueryParams().reduce((obj, { param }) => {
  obj[param] = true;
  return obj
}, {});

export const getFilteredQueryParamObj = (queryObj, key) => {

  if(key === 'category') {
    delete queryObj.type;
    delete queryObj.tag;
  }

  if(key === 'type') {
    delete queryObj.category;
    delete queryObj.tag;
  }

  if(key === 'tag') {
    delete queryObj.category;
    delete queryObj.type;
  }

  if(queryObj.type) {
    delete queryObj.category;
  }

  if(queryObj.tag) {
    delete queryObj.category;
    delete queryObj.type;
  }

  return { ...queryObj };
}
