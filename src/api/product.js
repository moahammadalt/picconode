import routes from "config/routes";
import { serviceHandler } from "utils/service";

import {
  productCreate,
  productListGet,
  productItemGet,
  productUpdate,
  productDelete,
} from "services";

export default router => {
  const { adminApi } = routes;

  router.post(adminApi.productCreate.url, (...arg) => {
    serviceHandler(...arg, productCreate);
  });

  router.get(adminApi.productList.url, (...arg) => {
    serviceHandler(...arg, productListGet);
  });

  router.get(adminApi.productItem.url, (...arg) => {
    serviceHandler(...arg, productItemGet);
  });

  router.post(adminApi.productUpdate.url, (...arg) => {
    serviceHandler(...arg, productUpdate);
  });

  router.post(adminApi.productDelete.url, (...arg) => {
    serviceHandler(...arg, productDelete);
  });
};
