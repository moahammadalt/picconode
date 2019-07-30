import routes from "config/routes";
import { serviceHandler } from "utils/service";

import {
  colorCreate,
  colorListGet,
  colorItemGet,
  colorUpdate,
  colorDelete,
} from "services";

export default router => {
  const { adminApi } = routes;

  router.post(adminApi.colorCreate.url, (...arg) => {
    serviceHandler(...arg, colorCreate);
  });

  router.get(adminApi.colorList.url, (...arg) => {
    serviceHandler(...arg, colorListGet);
  });

  router.get(adminApi.colorItem.url, (...arg) => {
    serviceHandler(...arg, colorItemGet);
  });

  router.post(adminApi.colorUpdate.url, (...arg) => {
    serviceHandler(...arg, colorUpdate);
  });

  router.post(adminApi.colorDelete.url, (...arg) => {
    serviceHandler(...arg, colorDelete);
  });
};
