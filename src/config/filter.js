export const lowPrice = 29;

export const maxPrice = 199;

export const defaultPage = 1;

export const defaultLimit = 12;

export const getValidQueryParams = ({
  availablesColorsSlugs,
  availablesSizesSlugs,
  flattenCategoriesHash
} = {}) => [
  {
    param: 'page',
    isSingle: true,
    validate: val => !isNaN(val)
  },
  {
    param: 'limit',
    isSingle: true,
    validate: val => !isNaN(val)
  },
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
