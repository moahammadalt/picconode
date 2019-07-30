import routes from "config/routes";
import { serviceHandler } from "utils/service";

import {
  sizeCreate,
  sizeListGet,
  sizeItemGet,
  sizeUpdate
} from "services";

export default router => {
  const { adminApi } = routes;

  router.post(adminApi.sizeCreate.url, (...arg) => {
    serviceHandler(...arg, sizeCreate);
  });

  router.get(adminApi.sizeList.url, (...arg) => {
    serviceHandler(...arg, sizeListGet);
  });

  router.get(adminApi.sizeItem.url, (...arg) => {
    serviceHandler(...arg, sizeItemGet);
  });

  router.post(adminApi.sizeUpdate.url, (...arg) => {
    serviceHandler(...arg, sizeUpdate);
  });
};
