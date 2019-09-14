import { getValidQueryParams } from 'config/filter';

export const validateFilterQuery = ({
  query,
  availablesColorsSlugs,
  availablesSizesSlugs,
  categoriesSlugs,
}) => {
  for (const paramName of Object.keys(query)) {
    const matchedParam = getValidQueryParams({
      availablesColorsSlugs,
      availablesSizesSlugs,
      categoriesSlugs,
    }).find(validParam => validParam.param === paramName);
    if (!matchedParam) {
      delete query[paramName];
    } else {
      !matchedParam.validate(query[paramName]) && delete query[paramName];
    }
  }
};
