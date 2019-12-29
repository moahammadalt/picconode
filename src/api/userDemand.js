import routes from "config/routes";
import { serviceHandler } from "utils/service";

import { userDemandList, userDemandSend } from "services";

const userDemandAPI = router => {
  const { adminApi, publicApi } = routes;

  router.post(publicApi.productUserDemand.url, (...arg) => {
    serviceHandler(...arg, userDemandSend);
  });

  router.get(adminApi.productUserDemandsList.url, (...arg) => {
    serviceHandler(...arg, userDemandList);
  });
};

export default userDemandAPI;
