import hbs from 'hbs';

import { getValidQueryParams, defaultLimit, defaultPage } from 'config/filter';

const getFilteredQueryParamObj = (queryObj, key) => {
  if (key === 'category') {
    delete queryObj.type;
    delete queryObj.tag;
  }

  if (key === 'type') {
    delete queryObj.category;
    delete queryObj.tag;
  }

  if (key === 'tag') {
    delete queryObj.category;
    delete queryObj.type;
  }

  if (key !== 'page' && key !== 'limit') {
    delete queryObj.page;
    delete queryObj.limit;
  }

  if (queryObj.type) {
    delete queryObj.category;
  }

  if (queryObj.tag) {
    delete queryObj.category;
    delete queryObj.type;
  }

  return { ...queryObj };
};

const singlurParams = getValidQueryParams()
  .filter(({ isSingle }) => isSingle)
  .map(({ param }) => param);

export const getFilterFieldsObjNames = () =>
  getValidQueryParams().reduce((obj, { param }) => {
    obj[param] = true;
    return obj;
  }, {});

export const getFilterHref = (query, key, value) => {
  let newQuery = getFilteredQueryParamObj({ ...query }, key) || {};

  if (newQuery[key] && singlurParams && !singlurParams.includes(key)) {
    const keysArr = newQuery[key].split(',');

    var index = keysArr.indexOf(value);
    if (index > -1) {
      keysArr.splice(index, 1);
    } else {
      keysArr.push(value);
    }
    newQuery[key] = keysArr.map(keyItem => keyItem).join(',');
  } else {
    newQuery[key] = value;
  }

  var queryString =
    '/products/?' +
    Object.keys(newQuery)
      .filter(keyParams => newQuery[keyParams])
      .map(keyParams => keyParams + '=' + newQuery[keyParams])
      .join('&');

  return queryString;
};

export const getProductsPagination = data => {
  let pageElm = '';
  const page = Number(data.query.page || defaultPage);
  const limit = data.query.limit || defaultLimit;
  const count = data.productListCount;

  const pagesCount = Math.ceil(count / limit);

  if (pagesCount <= 1) {
    return '';
  }

  if (page !== 1) {
    pageElm += `<li><a href="${getFilterHref(
      { ...data.query },
      'page',
      page - 1
    )}"><i class="fa fa-angle-left"></i></a></li>`;
  }

  pageElm += `<li ${page == defaultPage &&
    `class="active"`}><a href="${getFilterHref(
    { ...data.query },
    'page',
    1
  )}">1</a></li>`;

  if (page - 2 > 2) {
    pageElm += `<li><a>...</a></li>`;
  }

  for (let index = 2; index <= pagesCount - 1; index++) {
    let liElm = '';

    if (
      index === page - 1 ||
      index === page - 2 ||
      index === page + 1 ||
      index === page + 2 ||
      index === page
    ) {
      liElm = `<li ${page === index &&
        `class="active"`}><a href="${getFilterHref(
        { ...data.query },
        'page',
        index
      )}">${index}</a></li>`;
      pageElm += liElm;
    }
  }

  if (pagesCount - page - 1 > 2) {
    pageElm += `<li><a>...</a></li>`;
  }

  pageElm += `<li ${page == pagesCount &&
    `class="active"`}><a href="${getFilterHref(
    { ...data.query },
    'page',
    pagesCount
  )}">${pagesCount}</a></li>`;

  if (page !== pagesCount) {
    pageElm += `<li><a href="${getFilterHref(
      { ...data.query },
      'page',
      page + 1
    )}"><i class="fa fa-angle-right"></i></a></li>`;
  }

  return new hbs.SafeString(`
        <div class="text-center">
          <ul class="pagination">
            ${pageElm}
          </ul>
        </div>
      `);
};

export const getProductsPaginationLimit = data => {
  const productCount = data.productListCount;
  const page = data.query.page || defaultPage;
  const limit = data.query.limit || defaultLimit;
  const toCount = (page * limit) > productCount ? productCount : (page * limit);

  return `${page * limit - (limit - 1)} - ${toCount}`;
};
