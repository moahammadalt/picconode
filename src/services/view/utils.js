import { getValidQueryParams } from 'config/filter';
import { createHash } from 'globals/helpers';

export const validateFilterQuery = ({
  query,
  availablesColorsSlugs,
  availablesSizesSlugs,
  flattenCategoriesHash,
}) => {
  for (const paramName of Object.keys(query)) {
    const matchedParam = getValidQueryParams({
      availablesColorsSlugs,
      availablesSizesSlugs,
      flattenCategoriesHash,
    }).find(validParam => validParam.param === paramName);
    
    if (!matchedParam) {
      delete query[paramName];
    }
    else {
      !matchedParam.validate(query[paramName]) && delete query[paramName];
    }
    
    const flattenCategoriesValues = flattenCategoriesHash.values();
    if(flattenCategoriesValues && flattenCategoriesValues.length > 0) {
      const flattenCategoriesIDHash = createHash(flattenCategoriesValues, 'id');

      const getParentSlug = slug => flattenCategoriesIDHash.data[flattenCategoriesHash.data[slug].parent_id].slug;

      if (query.type) {
        query.category = getParentSlug(query.type);
      }

      if (query.tag) {
        query.type = getParentSlug(query.tag);
        query.category = getParentSlug(query.type);
      }
    }
  }
};
