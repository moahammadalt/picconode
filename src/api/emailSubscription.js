import routes from "config/routes";
import { serviceHandler } from "utils/service";

import { emailSubscribe, subscriptionGetList } from "services";

const emailSubscriptionAPI = router => {
  const { adminApi, publicApi } = routes;

  router.post(publicApi.emailSubscription.url, (...arg) => {
    serviceHandler(...arg, emailSubscribe);
  });

  router.get(adminApi.subscriptionList.url, (...arg) => {
    serviceHandler(...arg, subscriptionGetList);
  });
};

export default emailSubscriptionAPI;