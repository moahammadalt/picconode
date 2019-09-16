export const lowPrice = 0;

export const maxPrice = 4000;

export const getValidQueryParams = ({
  availablesColorsSlugs,
  availablesSizesSlugs,
  categoriesHash
} = {}) => [
  {
    param: 'category',
    isSingle: true,
    validate: val => categoriesHash.keys().includes(val)
  },
  {
    param: 'type',
    isSingle: true,
    validate: val => true
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
