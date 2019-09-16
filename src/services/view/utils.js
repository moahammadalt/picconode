import { getValidQueryParams } from 'config/filter';

export const validateFilterQuery = ({
  query,
  availablesColorsSlugs,
  availablesSizesSlugs,
  categoriesHash,
}) => {
  for (const paramName of Object.keys(query)) {
    const matchedParam = getValidQueryParams({
      availablesColorsSlugs,
      availablesSizesSlugs,
      categoriesHash,
    }).find(validParam => validParam.param === paramName);
    if (!matchedParam) {
      delete query[paramName];
    } else {
      !matchedParam.validate(query[paramName]) && delete query[paramName];
    }
  }
};
