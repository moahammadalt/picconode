import routes from "config/routes";
import { viewServiceHandler, serviceHandler } from "utils/service";

import {
  productItem,
  productList,
  userDemandSend,
} from "services";

export default router => {
  const { publicApi } = routes;

  router.get(publicApi.notFound.url, (...arg) => {
    const res = arg[1];
    res.render(publicApi.notFound.path);
  });

  router.get(publicApi.home.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.home.path,
    });
  });

  router.get(publicApi.productList.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.productList.path,
      service: productList,
    });
  });

  router.get(publicApi.product.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.product.path,
      service: productItem,
    });
  });

  router.post(publicApi.productUserDemand.url, (...arg) => {
    serviceHandler(...arg, userDemandSend);
  });
};
