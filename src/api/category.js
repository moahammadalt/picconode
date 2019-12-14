import routes from "config/routes";
import { serviceHandler } from "utils/service";

import {
  categoryCreate,
  categoryListGet,
  categoryItemGet,
  categoryUpdate,
  categoryDelete,
} from "services";

export default router => {
  const { adminApi } = routes;

  router.post(adminApi.categoryCreate.url, (...arg) => {
    serviceHandler(...arg, categoryCreate);
  });

  router.get(adminApi.categoryList.url, (...arg) => {
    serviceHandler(...arg, categoryListGet);
  });

  router.get(adminApi.categoryItem.url, (...arg) => {
    serviceHandler(...arg, categoryItemGet);
  });

  router.post(adminApi.categoryUpdate.url, (...arg) => {
    serviceHandler(...arg, categoryUpdate);
  });

  router.post(adminApi.categoryDelete.url, (...arg) => {
    serviceHandler(...arg, categoryDelete);
  });
  
};
