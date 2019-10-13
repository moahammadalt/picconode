import routes from "config/routes";
import { viewServiceHandler, serviceHandler } from "utils/service";
import { viewsPath } from 'globals/constants';

import {
  productItem,
  productList,
  userDemandSend,
  wishlistItemCreate,
  wishlistItemDelete,
  wishlistGet,
  emailSubscribe,
  homeGet,
  emailUserRegister,
  emailUserVerification,
  emailUserLogOut,
  emailUserLogIn,
} from "services";

export default router => {
  const { publicApi } = routes;

  router.get(publicApi.notFound.url, (...arg) => {
    const res = arg[1];
    res.render(viewsPath + publicApi.notFound.path);
  });

  router.get(publicApi.home.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.home.path,
      service: homeGet,
    });
  });

  router.get(publicApi.wishlistView.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.wishlistView.path,
      service: wishlistGet,
    });
  });

  router.get(publicApi.about.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.about.path,
    });
  });

  router.get(publicApi.contact.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.contact.path,
    });
  });

  router.get(publicApi.productList.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.productList.path,
      service: productList,
    });
  });

  router.get(publicApi.emailUserRegisterVerification.url, async (req, res, next) => {
    await viewServiceHandler({
      req, res, next,
      viewPathUrl: publicApi.emailUserRegisterVerification.path,
      service: emailUserVerification,
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

  router.post(publicApi.wishlistItemCreate.url, (...arg) => {
    serviceHandler(...arg, wishlistItemCreate);
  });

  router.post(publicApi.wishlistItemDelete.url, (...arg) => {
    serviceHandler(...arg, wishlistItemDelete);
  });

  router.post(publicApi.emailSubscription.url, (...arg) => {
    serviceHandler(...arg, emailSubscribe);
  });

  router.post(publicApi.emailUserRegister.url, (...arg) => {
    serviceHandler(...arg, emailUserRegister);
  });

  router.post(publicApi.emailUserLogOut.url, (...arg) => {
    serviceHandler(...arg, emailUserLogOut);
  });

  router.post(publicApi.emailUserLogIn.url, (...arg) => {
    serviceHandler(...arg, emailUserLogIn);
  });
};
